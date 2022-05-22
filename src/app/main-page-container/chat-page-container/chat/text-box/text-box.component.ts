import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChatService} from "../../../services/chat-service/chat.service";
import {MessageChannel} from "../../../../shared/models/message-channel";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  message = new FormControl('');
  constructor(private _chatService: ChatService) { }
  @Input() channel: MessageChannel = {
    _id: '',
    users: [],
    messages: [{
      author: {
        _id: '',
        username: '',
        friends: []
      },
      content: '',
      date: new Date(),
      readBy: []
    }],
    lastSentDate: new Date()
  };

  ngOnInit(): void {
  }

  buttonClick(variable: any): void {

    if(this.message.value) {
      this._chatService.sendMessage(this.message.value, this.channel);
    }
    this.message.reset();
    variable.preventDefault();

  }
}
