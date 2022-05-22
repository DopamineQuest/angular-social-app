import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { User } from "../../models/user";
import { ChatService } from "../../../main-page-container/services/chat-service/chat.service";
import { RestApiService } from "../rest-api-service/rest-api.service";
import { map } from 'rxjs/operators';
import { UserProfileService } from "../user-profile.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = {
    _id: "",
    username: "",
    friends: []
  };

  private loginStatus: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private _chatService: ChatService, private _restApiService: RestApiService, private _userProfileService: UserProfileService) {
  }

  getLoginStatus(): BehaviorSubject<Boolean> {
    return this.loginStatus;
  }

  quickRegisterUser(user: any): Observable<any> {
    return this._restApiService.addUser(user).pipe(map((res: any) => {
      this.user = res;
      this._userProfileService.setUser(this.user);
      this._chatService.socketIOConnect(this.user);
      this.setLoginStatus(true);
    }));
  }

  quickLoginUser(user: any): Observable<any> {
    return this._restApiService.login(user).pipe(map((res: any) => {
      this.user = res;
      this._userProfileService.setUser(this.user);
      this._chatService.socketIOConnect(this.user);
      this.setLoginStatus(true);
    }));
  }

  setLoginStatus(value: boolean): void {
    this.loginStatus.next(value);
  }
}
