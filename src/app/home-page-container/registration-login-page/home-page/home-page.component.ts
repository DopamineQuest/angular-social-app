import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../shared/services/user-service/user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  username : string = "";
  warningMessage: string = "";
  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
  }

  quickRegister() {
    this._userService.quickRegisterUser({username: this.username}).subscribe({
      error: (err) => {
        try {
          this.warningMessage = err.error.errors.username.message;
        } catch {
          this.warningMessage = "Please try again with a different username";
        }
        this.router.navigate(['/home']);
      },
      next: (res) => {
        this.router.navigate(['/main/personal']);
      }
    });
  }

  quickLogin() {
    this._userService.quickLoginUser({username: this.username}).subscribe({
      error: (err) => {
        try {
          this.warningMessage = err.error.errors.username.message;
        } catch {
          this.warningMessage = "Please try again with a different username";
        }
        this.router.navigate(['/home']);
      },
      next: (res) => {
        this.router.navigate(['/main/personal']);
      }
    });
  }
}
