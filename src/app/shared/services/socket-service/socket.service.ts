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
    this._socket = io(this._socketUrl);
    this._socket.emit('test', (error: any) => {
    })

  }

  getSocket(): any {
    return this._socket;
  }

}
