import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  private subRoomSideBarButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private messageChannelButtonState: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private serverChannelButtonState: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor() {

  }

  getSubRoomSideBarButton(): BehaviorSubject<boolean>
  {
    return this.subRoomSideBarButton;
  }

  setSubRoomSideBarButtonClick(value: boolean): void {
    this.subRoomSideBarButton.next(value);
  }

  getMessageChannelButtonState(): BehaviorSubject<number>
  {
    return this.messageChannelButtonState;
  }

  setMessageChannelButtonStateClick(value: number): void {
    this.messageChannelButtonState.next(value);
  }

  getServerChannelButtonState(): BehaviorSubject<number>
  {
    return this.serverChannelButtonState;
  }

  setServerChannelButtonStateClick(value: number): void {
    this.serverChannelButtonState.next(value);
  }

  incrementButtonIndex() {
    this.messageChannelButtonState.next(this.messageChannelButtonState.value + 1);
  }
}
