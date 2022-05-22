import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat-service/chat.service";
import {UserService} from "../../../../shared/services/user-service/user.service";
import {Message} from "../../../../shared/models/message";
import {UserProfileService} from "../../../../shared/services/user-profile.service";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  @Input() messages: Message[] = [];
  private messageListener: any;
  private allMessagesListener: any;

  constructor(private _chatService: ChatService, private _userService: UserService, private _userProfileService: UserProfileService) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.messageListener.unsubscribe();
    this.allMessagesListener.unsubscribe();
  }

}
