import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat-service/chat.service";
import {UserService} from "../../../../shared/services/user-service/user.service";
import {MessageChannel} from "../../../../shared/models/message-channel";
import {ButtonService} from "../../../../shared/services/button-service/button.service";
import {User} from "../../../../shared/models/user";
import {UserProfileService} from "../../../../shared/services/user-profile.service";

@Component({
  selector: 'app-sub-rooms-side-bar',
  templateUrl: './sub-rooms-side-bar.component.html',
  styleUrls: ['./sub-rooms-side-bar.component.css']
})
export class SubRoomsSideBarComponent implements OnInit {

  elements = Array(5);
  private _user: User | undefined = undefined;

  @Input() messageChannels: MessageChannel[] = [];
  @Input() messageChannelIndex: number = 0;

  constructor(private _chatService: ChatService,
              private _userService: UserService,
              private _buttonService: ButtonService,
              private _userProfileService: UserProfileService) {
    _userProfileService.getUser().subscribe((value: User) => {
      this._user = value;
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  onClick(index: number, channel: MessageChannel) {
    this._buttonService.setMessageChannelButtonStateClick(index)
    this._chatService.markMessagesAsRead(channel);
  }

  isUnread(channel: MessageChannel) {
    if(channel.messages?.length === 0) {
      return false;
    }

    let readByUsers = channel.messages[channel.messages?.length - 1].readBy
    for(let i = 0; i < readByUsers.length; i++) {
      if(readByUsers[i]._id === this._user?._id) {
        return false;
      }
    }
    return true;
  }
}
