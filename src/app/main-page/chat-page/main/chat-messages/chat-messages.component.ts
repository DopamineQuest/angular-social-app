import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat-service/chat.service";
import {User} from "../../../../shared/models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  @Input() messages: string[] = [];
  private messageListener: any;
  private allMessagesListener: any;
  constructor(private _chatService: ChatService) {
    // this._chatService.listenForMessages();
    this._chatService.sendUsername(new Date().toString(), '1');
  }

  ngOnInit(): void {
    this.messageListener = this._chatService.listenForMessages().subscribe({
      next: (message) =>  {
        this.messages.push(message);
      }
    });

    this.allMessagesListener = this._chatService.listenForAllMessages().subscribe({
      next: (messages) =>  {


        this.messages = this.messages.concat(messages);
        // for (let i = 0; i < messages.length; i++) {
        //   this.messages.push(messages[i]);
        // }
        //
        // console.log('LISTEN FOR ALL MESSAGES 55555555555'+messages.length)


        // for (let i = 0; i < Object.keys(messages).length; i++) {
        //   this.messages.push(Object.keys(messages)[i]);
        // }
        //
        // console.log('LISTEN FOR ALL MESSAGES 55555555555'+Object.values(messages).length)
        //
      }
    });
  }

  ngOnDestroy() {
    this.messageListener.unsubscribe();
    this.allMessagesListener.unsubscribe();
  }


}
