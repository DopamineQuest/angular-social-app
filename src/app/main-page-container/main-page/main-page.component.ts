import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user-service/user.service";
import {User} from "../../shared/models/user";
import {ChatService} from "../services/chat-service/chat.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @Input() user: User | undefined;

  constructor(private _chatService: ChatService, private _userService: UserService) {

  }

  ngOnInit(): void {

  }
}
