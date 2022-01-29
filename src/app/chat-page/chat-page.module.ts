import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListBarComponent} from "./chat-page/user-list-bar/user-list-bar.component";
import {TextBoxComponent} from "./chat-page/text-box/text-box.component";
import {SubRoomsSideBarComponent} from "./chat-page/sub-rooms-side-bar/sub-rooms-side-bar.component";
import {RoomsSideBarComponent} from "./chat-page/rooms-side-bar/rooms-side-bar.component";
import {RoomComponent} from "./chat-page/room/room.component";
import {MainSideBarComponent} from "./chat-page/main-side-bar/main-side-bar.component";
import {MainPageComponent} from "./chat-page/main-page/main-page.component";
import {MainChatComponent} from "./chat-page/main-chat/main-chat.component";
import {ChatMessagesComponent} from "./chat-page/chat-messages/chat-messages.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: 'main', component: MainPageComponent }
];

@NgModule({
  declarations: [UserListBarComponent,
    TextBoxComponent,
    SubRoomsSideBarComponent,
    RoomsSideBarComponent,
    RoomComponent,
    MainSideBarComponent,
    MainPageComponent,
    MainChatComponent,
    ChatMessagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    UserListBarComponent,
    TextBoxComponent,
    SubRoomsSideBarComponent,
    RoomsSideBarComponent,
    RoomComponent,
    MainSideBarComponent,
    MainPageComponent,
    MainChatComponent,
    ChatMessagesComponent
  ]
})
export class ChatPageModule { }
