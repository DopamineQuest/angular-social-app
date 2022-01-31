import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Message } from "../../models/message";
import {SocketService} from "../../../shared/services/socket-service/socket.service";



@Injectable()
export class ChatService {
  // private _socketUrl: string = "http://localhost:9090/user";
  // private _socket;
  constructor(private _socketService: SocketService) {
    // console.log('service working!!--------------------------------')
    // this._socket = io(this._socketUrl);
    // this._socket.on("social-app", (user: any | undefined) => {
    //   console.log("-------------------------------------------------------is obersver next called? 2");
    // });
  }

  // getMessagesList(): Observable<Message[]>
  // {
  //   return new Observable(observer => {
  //     console.log("getMessageList - Service ");
  //     this._socketService.getSocket().on("messagesList", (messages: Message[] | undefined) => {
  //       console.log("is obersver next called? ");
  //     observer.next(messages);
  //     })
  //   });
  // }

}
