import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomComponent} from "./room/room.component";
import {RoomsSideBarComponent} from "./rooms-side-bar/rooms-side-bar.component";
import {SubRoomsSideBarComponent} from "./sub-rooms-side-bar/sub-rooms-side-bar.component";
import {MainSideBarComponent} from "./main-side-bar/main-side-bar.component";



@NgModule({
  declarations: [
    RoomComponent,
    RoomsSideBarComponent,
    SubRoomsSideBarComponent,
    MainSideBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RoomComponent,
    RoomsSideBarComponent,
    SubRoomsSideBarComponent,
    MainSideBarComponent
  ]
})
export class SideBarModule { }
