import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {io} from "socket.io-client";
import {User} from "../../../shared/models/user";
import {Router} from "@angular/router";
import {MessageChannel} from "../../../shared/models/message-channel";
import {RestApiService} from "../../../shared/services/rest-api-service/rest-api.service";
import {ButtonService} from "../../../shared/services/button-service/button.service";
import {UserProfileService} from "../../../shared/services/user-profile.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _socketUrl: string = "http://localhost:9090/user";
  private _socket;
  private connected: boolean = false;
  messageChannelIndex: number = 0;
  public getMessageChannelListener: any;
  _user: User | undefined;
  messageChannels: MessageChannel[] = [];
  $messageChannels: BehaviorSubject<MessageChannel[]> = new BehaviorSubject<MessageChannel[]>(this.messageChannels)

  constructor(private router: Router,
              private _restApiService: RestApiService,
              private _buttonService: ButtonService,
              private _userProfileService: UserProfileService) {
    this._socket = io(this._socketUrl);

    _userProfileService.getUser().subscribe((value: User) => {
      this._user = value;
    })

    this.getMessageChannelListener = this._buttonService.getMessageChannelButtonState().subscribe({
      next: (value) =>  {
        this.messageChannelIndex = value;
      }
    });
  }

  public socketIOConnect(user: User) {
    if (user) {

      this._socket.emit('setup', user);
      this._socket.on("connected", () => {
        this.connected = true;
      })

      this._socket.on("channel added", (data: any) => {
        this.messageChannels.unshift(data);

        if (this.messageChannels.length === 1) {
          this._buttonService.setMessageChannelButtonStateClick(0);
          this.markMessagesAsRead(this.messageChannels[0]);
        }
        else {
          this._buttonService.incrementButtonIndex();
        }
      })

      this._socket.on("message received", (data: any) => {

        let channelExists = false;
        let index = 0;
        while (index < this.messageChannels.length ) {

          if (this.messageChannels[index]._id === data.channel._id) {
            channelExists = true;
            break;
          }

          if (channelExists) {
            break;
          }
          index++;
        }

        this.messageChannels[index].messages.push(data.message);

        if (index === this.messageChannelIndex) {
          this.markMessagesAsRead(this.messageChannels[index]);
          this.moveChannelToTop();
          this._buttonService.setMessageChannelButtonStateClick(0);
        } else if (index !== 0) {
          let channelRemoved = this.messageChannels.splice(index, 1)[0];
          this.messageChannels.unshift(channelRemoved);
          if (index > this.messageChannelIndex) {
            this._buttonService.incrementButtonIndex();
          }
        }
      })

      this._socket.on("logout", () => {
        this.router.navigate(['/home']);
      })
    } else {
      this.router.navigate(['/home']);
    }
  }

  public joinChannel(channelId: any) {
    if (this.connected && channelId !== '') {
      this._socket.emit("join room", channelId);
    }
  }

  public sendMessage(msg: string, channel: MessageChannel): void {
    if(!this._user) {
      return;
    }

    if (channel._id === "") {

      let newMessageChannel2 = {
        _id: '',
        users: [...channel.users],
        messages: [...channel.messages],
        lastSentDate: new Date()
      };

      newMessageChannel2.messages.push(this.createMessage(msg, this._user));
      this.messageChannels[this.messageChannelIndex].messages[0] = newMessageChannel2.messages[0];
      newMessageChannel2.lastSentDate = newMessageChannel2.messages[0].date;

      this._socket.emit('add channel', { channel: newMessageChannel2}, (response: any, error: any) => {
        this.messageChannels[this.messageChannelIndex]._id = response._id;
        this._buttonService.setMessageChannelButtonStateClick(0);
      })

    } else {
      let newMsg = this.createMessage(msg, this._user)
      newMsg.readBy.push(this._user)
      channel.messages.push(newMsg);
      this.messageChannels[this.messageChannelIndex].messages[0] = channel.messages[0];
      this.moveChannelToTop();
      this._buttonService.setMessageChannelButtonStateClick(0);

      channel.lastSentDate = newMsg.date;
      this._socket.emit('send message', { message: newMsg, channel: channel}, (error: any) => {
      })
    }
  }

  private moveChannelToTop() {
    let channelRemoved = this.messageChannels.splice(this.messageChannelIndex, 1)[0];
    this.messageChannels.unshift(channelRemoved);
  }

  listenForAllMessages(): Observable<string[]>
  {
    return new Observable(observer => {
      this._socket.on("allMessages", (msg: any | undefined) => {
        var messageArray: string[] = [];
        for (let i = 0; i < Object.keys(msg).length; i++) {
          messageArray.push(Object.keys(msg)[i].toString());
        }
        observer.next(messageArray);
      })
    });
  }

  searchForUser(searchTerm: string, user: User): void {
    this._socket.emit('onAllSearchedUsers', {msg: searchTerm, user}, (error: any) => {
    })
  }

  listenForAllSearchedUsers(): Observable<User[]>
  {
    return new Observable(observer => {
      this._socket.on("allSearchedUsers", (msg: User[]) => {
        var userNamesArray: string[] = [];
        for (let i = 0; i < Object.values(msg).length; i++) {
          userNamesArray.push(Object.values(msg)[i].toString());
        }
        observer.next(msg);
      })
    });
  }

  sendMessageRequest(userTo: User, userFrom: User): void {
    this._socket.emit('messageRequest', { userTo, userFrom }, (error: any) => {
    })
  }

  addMessageChannel(userTo: User, userFrom: User): void
  {
    let newChannel = {
      _id: '',
      users: [userFrom, userTo],
      messages: [],
      lastSentDate: new Date()
    }

    let channelExists = false;
    let index = 0;
    while(index < this.messageChannels.length ) {
      for (let j = 0; j < this.messageChannels[index].users.length; j++) {
        if (this.messageChannels[index].users[j].username === userTo.username && this.messageChannels[index].users.length === 2) {
          channelExists = true;
          break;
        }
      }
      if (channelExists) {
        break;
      }
      index++;
    }

    if (!channelExists) {
      this.messageChannels.unshift(newChannel)
      this._buttonService.setMessageChannelButtonStateClick(0)
    } else {
      this._buttonService.setMessageChannelButtonStateClick(index)
    }

    this.$messageChannels.next(this.messageChannels);
  }

  listenAllMessageChannels(): Observable<MessageChannel[]> {
    return this.$messageChannels;
  }

  createMessage(msg: string, user: User) {
    return {
      author: user,
      content: msg,
      date: new Date(),
      readBy: [user]
    };
  }

  getAllMessageChannels(user: User | undefined) {
    if (!user) {
      return;
    }

    this._restApiService.getAllMessageChannels(user).subscribe({
      error: (err) => {
      },
      next: (res: MessageChannel[]) => {
        this.messageChannels = res;
        this.$messageChannels.next(res);
        if (this.messageChannels.length > 0) {
          this._buttonService.setMessageChannelButtonStateClick(0);
          this.markMessagesAsRead(this.messageChannels[0]);
        }
      }
    });
  }

  markMessagesAsRead(channel: MessageChannel) {
    if (channel.messages?.length === 0) {
      return;
    }

    for(let i = 0; i < channel.messages.length; i++) {
      let readByUsers = channel.messages[i].readBy;
      let userFound = false;
      for(let i = 0; i < readByUsers.length; i++) {
        if (readByUsers[i]._id === this._user?._id) {
          userFound = true;
          break;
        }
      }

      if (!userFound && this._user) {
        readByUsers.push(this._user)
      }
    }

    this._socket.emit('mark message channel read', { messageChannelId: channel._id, userId: this._user?._id }, (response: any, error: any) => {

    })
  }
}
