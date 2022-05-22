import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ChatService} from "../../../services/chat-service/chat.service";
import {User} from "../../../../shared/models/user";
import {UserProfileService} from "../../../../shared/services/user-profile.service";

@Component({
  selector: 'app-side-top-bar',
  templateUrl: './side-top-bar.component.html',
  styleUrls: ['./side-top-bar.component.css']
})
export class SideTopBarComponent implements OnInit {

  message = new FormControl('');
  userValue: string = "";
  users: User[] = [];
  selected: boolean = false;

  private allSearchedUsersListener: any;
  displayNoUsersFound: boolean = false;

  constructor(private _chatService: ChatService, private _userProfileService: UserProfileService) { }

  ngOnInit(): void {

    this.allSearchedUsersListener = this._chatService.listenForAllSearchedUsers().subscribe({
      next: (users) =>  {

        let userNamesArray: string[] = [];
        for (let i = 0; i < Object.values(users).length; i++) {
          userNamesArray.push(Object.values(users)[i].username.toString());
        }

        this.users = users;

        if(this.users.length > 0) {
          this.displayNoUsersFound = false;
        } else {
          this.displayNoUsersFound = true;
        }
      }
    });
  }
  onFocus() {
    this.selected = true;
  }

  onBlur() {
    this.selected = false;
    this.displayNoUsersFound = false;
    this.message.reset();
  }

  onKeypressEvent(variable: any): void {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!variable.charCode ? variable.which : variable.charCode);
    if (regex.test(str) || variable.code === "Backspace") {
      if(this.message?.value?.length > 0) {
        this._chatService.searchForUser(this.message.value, this._userProfileService.getUser().value);
      } else {
        this.users = [];
      }
    }
    variable.preventDefault();
  }

  buttonClick(variable: any): void {
    this.message.reset();
    variable.preventDefault();
  }
}
