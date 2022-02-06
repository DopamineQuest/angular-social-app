import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Message } from "../../models/message";
import { SocketService } from "../../../shared/services/socket-service/socket.service";
import {io} from "socket.io-client";
import {User} from "../../../shared/models/user";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _socketUrl: string = "http://localhost:9090/user";
  private _socket;

  constructor() {
    this._socket = io(this._socketUrl);

    // this._socket.on("connected", () => {
    //   this._socket.emit('join', { username: new Date().toString(), room: this._userRoom }, (username: User | undefined) => {
    //
    //   })
    // })


    // setTimeout(() => {
    //   this._socket.disconnect();
    // },3000)
  }

  ngOnInit() {


  }

  sendMessage(msg: string): void {
    console.log("going into emit!", msg);
    this._socket.emit('message', { message: msg }, (error: any) => {
      console.log("----------------------test works!!", error);
    })
  }

  sendUsername(date: string, room: string): void {

    this._socket.on("connected", () => {
      this._socket.emit('join', { username: date, room: room }, (username: User | undefined) => {
      })
    })
  }

  // getUser(): Observable<User>
  // {
  //   return new Observable(observer => {
  //     console.log("----------------------getUser() - newObservable - user-service");
  //
  //     this._socket.on("connected", () => {
  //       console.log("CONNECTED!!: from client side connceted")
  //       this._socket.emit('join', { username: this._userName, room: this._userRoom }, (username: User | undefined) => {
  //         console.log("----------------------getUser() - newObservable - callback - user-service");
  //         observer.next(username);
  //       })
  //     })
  //     console.log("----------------------emit over - getUser() - newObservable - user-service");
  //   });
  // }


  listenForMessages(): Observable<string>
  {
    return new Observable(observer => {
      console.log("----------------------getMessage() - newObservable - user-service");

      this._socket.on("newMessage", (msg: string | undefined) => {
        console.log("-------------------~~~~~||---getUser() - newObservable - callback - user-service", msg);
        observer.next(msg);
      })
      console.log("----------------------emit over - getMessage() - newObservable - user-service");
    });
  }

  listenForAllMessages(): Observable<string[]>
  {
    return new Observable(observer => {
      this._socket.on("allMessages", (msg: any | undefined) => {
        console.log("-------------------~~~~~||---getUser() - newObservable - callback - user-service", msg);

        var messageArray: string[] = [];
        for (let i = 0; i < Object.keys(msg).length; i++) {
          messageArray.push(Object.keys(msg)[i].toString());
        }
        observer.next(messageArray);
      })
    });
  }

  // listenForAllMessages(): Observable<object>
  // {
  //   return new Observable(observer => {
  //     this._socket.on("allMessages", (msg: object | undefined) => {
  //       console.log("-------------------~~~~~||---getUser() - newObservable - callback - user-service", msg);
  //       observer.next(msg);
  //     })
  //   });
  // }

}




// import { Injectable } from '@angular/core';
//
// import { Observable } from 'rxjs';
//
// import { Message } from "../../models/message";
// import { SocketService } from "../../../shared/services/socket-service/socket.service";
// import {io} from "socket.io-client";
// import {User} from "../../../shared/models/user";
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//
//   private _socketUrl: string = "http://localhost:9090/user";
//   private _socket;
//
//   _userName: string = "Antonin";
//   _userRoom: string = "1";
//
//   constructor() {
//     this._socket = io(this._socketUrl);
//
//
//     this._socket.emit('test', (error: any) => {
//       console.log("----------------------test works!!", error);
//     })
//     console.log('testss');
//
//     this._socket.on("users", () =>
//     {
//       this._socket.emit('join', {username: this._userName, room: this._userRoom}, (username: User | undefined) => {
//       })
//     })
//   }
//
//
//   getUser(): Observable<User>
//   {
//     return new Observable(observer => {
//       console.log("----------------------getUser() - newObservable - user-service");
//
//       this._socket.on("connected", () => {
//         console.log("CONNECTED!!: from client side connceted")
//         this._socket.emit('join', {username: this._userName, room: this._userRoom}, (username: User | undefined) => {
//           console.log("----------------------getUser() - newObservable - callback - user-service");
//           observer.next(username);
//         })
//       })
//       console.log("----------------------emit over - getUser() - newObservable - user-service");
//     });
//   }
//
//   findUser(username: string): void {
//     console.log("FINDING USER-insider function call")
//     this._socket.emit("getUserByUsername", username, (user: User | undefined) => {
//       console.log("----------------------FOUND USERNAME", user?._username);
//     });
//   }
//
// }



