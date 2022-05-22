import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  user: User = {
    _id: "",
    username: "",
    friends: []
  };
  private userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  constructor() { }

  getUser(): BehaviorSubject<User> {
    return this.userBehaviorSubject;
  }

  setUser(value: User): void {
    this.userBehaviorSubject.next(value);
  }
}
