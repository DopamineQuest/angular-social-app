import {Component, Input, OnInit} from '@angular/core';
import {MessageChannel} from "../../../../shared/models/message-channel";

@Component({
  selector: 'app-message-channel',
  templateUrl: './message-channel.component.html',
  styleUrls: ['./message-channel.component.css']
})
export class MessageChannelComponent implements OnInit {

  @Input() data: MessageChannel = {
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

  @Input() isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
}
