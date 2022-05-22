import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/message";
import {ChatService} from "../../services/chat-service/chat.service";

@Component({
  selector: 'app-channels-page',
  templateUrl: './channels-page.component.html',
  styleUrls: ['./channels-page.component.css']
})
export class ChannelsPageComponent implements OnInit {

  title: string = "";
  messages: Message[] = [];

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {

  }
}
