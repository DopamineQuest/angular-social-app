import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {MessageChannel} from "../../models/message-channel";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  REST_API: string = 'http://localhost:9090/api/';

  constructor(private http: HttpClient) {
  }

  addUser(user: any): Observable<string> {
    return this.http.post<string>(`${this.REST_API}add-user`, user);
  }

  login(user: any): Observable<string> {
    return this.http.post<string>(`${this.REST_API}login`, user);
  }

  addMessageChannel(messageChannel: MessageChannel): Observable<MessageChannel> {
    return this.http.post<MessageChannel>(`${this.REST_API}add-message`, messageChannel);
  }

  getAllMessageChannels(user: User): Observable<MessageChannel[]> {
    return this.http.get<MessageChannel[]>(`${this.REST_API}user-message-channels/${user._id}`, );
  }
}
