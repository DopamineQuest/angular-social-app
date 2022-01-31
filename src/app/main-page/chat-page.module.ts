import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListBarComponent} from "./chat-page/main/user-list-bar/user-list-bar.component";
import {TextBoxComponent} from "./chat-page/main/text-box/text-box.component";
import {SubRoomsSideBarComponent} from "./chat-page/side-bar/sub-rooms-side-bar/sub-rooms-side-bar.component";
import {RoomsSideBarComponent} from "./chat-page/side-bar/rooms-side-bar/rooms-side-bar.component";
import {RoomComponent} from "./chat-page/side-bar/room/room.component";
import {MainSideBarComponent} from "./chat-page/side-bar/main-side-bar/main-side-bar.component";
import {MainPageComponent} from "./chat-page/main-page/main-page.component";
import {MainChatComponent} from "./chat-page/main/main-chat/main-chat.component";
import {ChatMessagesComponent} from "./chat-page/main/chat-messages/chat-messages.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ChatService} from "./services/chat-service/chat.service";
import {SideBarModule} from "./chat-page/side-bar/side-bar.module";

const routes: Routes = [
  { path: 'main', component: MainPageComponent }
];

@NgModule({
  declarations: [
    UserListBarComponent,
    TextBoxComponent,
    MainPageComponent,
    MainChatComponent,
    ChatMessagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes),
    SideBarModule
  ],
  providers: [ChatService],
  exports: [
    UserListBarComponent,
    TextBoxComponent,
    MainPageComponent,
    MainChatComponent,
    ChatMessagesComponent
  ]
})
export class ChatPageModule { }
