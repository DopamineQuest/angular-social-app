import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../shared/services/user-service/user.service";
import {User} from "../../../shared/models/user";
import {ChatService} from "../../services/chat-service/chat.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @Input() user: User | undefined;

  constructor(private _userService: ChatService) {
    console.log("----------------------constructor - main-page-component");
    // user = this._userService.getUser().

    // setTimeout(() => {
    //
    //   console.log("FINDING USER")
    //   this._userService.findUser('antonin');
    // },100)
  }

  ngOnInit(): void {

    console.log("----------------------=========================ngoninit() - main-page-component");

    // this._userService.getUser().subscribe({
    //   next: (user) =>  {
    //     this.user = user;
    //     console.log("----------------------got user in Main Chat Services:!!!", this.user);
    //   }
    // });


    // setTimeout(() =>     this._userService.getUser().subscribe({
    //   next: (user) =>  {
    //     this.user = user;
    //     console.log("----------------------got user in Main Chat Services:!!!", this.user);
    //   }
    // }),1000)

  }


}

//TODO poll until connected comes back as true if it is emitting too early. set time out?


// setTimeout(() => {
//
//   console.log("FINDING USER")
//   this._userService.findUser('antonin');
// },100)

// this._userService.getUser().subscribe({
//   next: (user) =>  {
//     this.user = user;
//     console.log("----------------------got user in Main Chat Services:!!!", this.user);
//   }
// });
