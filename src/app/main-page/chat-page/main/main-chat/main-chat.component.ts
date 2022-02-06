import { Component, OnInit } from '@angular/core';
import { ChatService } from "../../../services/chat-service/chat.service";
import { Message } from "../../../models/message";

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css']
})
export class MainChatComponent implements OnInit {

  title: string = "Order Your Pizza!";
  messages: Message[] = [];

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {

  }

}
