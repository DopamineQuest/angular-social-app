import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChatService} from "../../../services/chat-service/chat.service";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {

  message = new FormControl('');
  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {
  }

  buttonClick(variable: any): void {
    console.log(this.message.value);
    this._chatService.sendMessage(this.message.value);
    this.message.reset();

    variable.preventDefault();

  }
}
