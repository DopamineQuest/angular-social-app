import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MessageChannel} from "../../../shared/models/message-channel";
import {ChatService} from "../../services/chat-service/chat.service";
import {ButtonService} from "../../../shared/services/button-service/button.service";
import {UserProfileService} from "../../../shared/services/user-profile.service";
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {
  messageChannels: MessageChannel[] = [];
  private allPersonalChannelsListener: any;
  private subRoomSideBarButtonListener: any;
  public getMessageChannelListener: any;
  messageChannelIndex: number = 0;
  sidebarToggle: boolean = true;
  private listenForAllMessageChannels: any;
  private _user: User | undefined = undefined;
  private socketChannelJoined = false;

  constructor(private _chatService: ChatService, private _buttonService: ButtonService, private _userProfileService: UserProfileService) {
    _userProfileService.getUser().subscribe((value: User) => {
      this._user = value;
    })
  }

  ngOnInit(): void {
    this.subRoomSideBarButtonListener = this._buttonService.getSubRoomSideBarButton().subscribe({
      next: (value) =>  {
        this.sidebarToggle = !this.sidebarToggle;
      }
    });

    this.getMessageChannelListener = this._buttonService.getMessageChannelButtonState().subscribe({
      next: (value) =>  {
        this.messageChannelIndex =  value;
        if(this.messageChannels.length > 0 && !this.socketChannelJoined && this.messageChannels[this.messageChannelIndex]._id !== '') {
          this.socketChannelJoined = true;
          let channelToJoin : MessageChannel = this.messageChannels[this.messageChannelIndex];
          this._chatService.joinChannel(channelToJoin._id);
        }
      }
    });

    this.listenForAllMessageChannels = this._chatService.listenAllMessageChannels().subscribe({
      next: (messageChannels) =>  {
        this.messageChannels = messageChannels
      }
    });

    this._chatService.getAllMessageChannels(this._user);
  }

  ngOnDestroy() {
    this.allPersonalChannelsListener.unsubscribe;
  }

  handleSelectedUserEvent(data: any) {

  }
}
