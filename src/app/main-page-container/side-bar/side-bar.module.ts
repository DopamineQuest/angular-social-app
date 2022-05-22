import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomComponent} from "./room/room.component";
import {MainSideBarComponent} from "./main-side-bar/main-side-bar.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    RoomComponent,

    MainSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RoomComponent,
    MainSideBarComponent
  ]
})
export class SideBarModule { }
