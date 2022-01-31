import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "../../models/user";
import { SocketService } from "../socket-service/socket.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _userName: string = "Antonin";
  _userRoom: string = "1";
  constructor(private _socketService: SocketService) {
    console.log("----------------------constructor - user-service");


    this._socketService.getSocket().on("users", () =>
    {
      this._socketService.getSocket().emit('join', {username: this._userName, room: this._userRoom}, (username: User | undefined) => {

      })

    })
  }

  getUser(): Observable<User>
  {
    return new Observable(observer => {
      console.log("----------------------getUser() - newObservable - user-service");

      // this._socketService.getSocket().emit('join', {username: this._userName, room: this._userRoom}, (username: User | undefined) => {
      //   console.log("----------------------getUser() - newObservable - callback - user-service");
      //   observer.next(username);
      // })

      this._socketService.getSocket().on("connected", () => {
        console.log("CONNECTED!!: from client side connceted")
        this._socketService.getSocket().emit('join', {username: this._userName, room: this._userRoom}, (username: User | undefined) => {
          console.log("----------------------getUser() - newObservable - callback - user-service");
          observer.next(username);
        })
      })




      console.log("----------------------emit over - getUser() - newObservable - user-service");

    });
  }

  // newUser(order: PizzaOrders): void {
  //   this._socket.emit("newPizzaOrder", order);
  // }

  findUser(username: string): void {
    console.log("FINDING USER-insider function call")
    this._socketService.getSocket().emit("getUserByUsername", username, (user: User | undefined) => {
      console.log("----------------------FOUND USERNAME", user?._username);

    });
  }

}


// this._socketService.getSocket().emit('join', {username: this._userName, room: this._userRoom}, (error: any) => {
//   if(error) {
//     alert(error)
//     location.href ='/'
//   }
// }, (username: User | undefined) => {
//   console.log("----------------------getUser() - newObservable - callback - user-service");
//   observer.next(username);
// })
