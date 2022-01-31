import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socketUrl: string = "http://localhost:9090/user";
  private _socket;
  constructor() {
    console.log("----------------------constuctor - socket-service");
    this._socket = io(this._socketUrl);
    // this._socket.on("social-app", (user: any | undefined) => {
    //   console.log("----------------------constuctor - socket.on(social-app) - socket-service");
    // });

    console.log("----------------------constuctor - socket-service- ==========emit test");


    this._socket.emit('test', (error: any) => {
        console.log("----------------------test works!!", error);
    })

    // setTimeout(() => {
    //   this._socket.emit('test', (error: any) => {
    //     console.log("----------------------test works!!", error);
    //   })
    // },1000)

  }

  getSocket(): any
  {
    console.log("----------------------getSocket() - socket-service");
    return this._socket;
  }

}
