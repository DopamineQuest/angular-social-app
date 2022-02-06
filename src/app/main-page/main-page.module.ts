import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListBarComponent} from "./chat-page/main/user-list-bar/user-list-bar.component";
import {TextBoxComponent} from "./chat-page/main/text-box/text-box.component";
import {MainPageComponent} from "./chat-page/main-page/main-page.component";
import {MainChatComponent} from "./chat-page/main/main-chat/main-chat.component";
import {ChatMessagesComponent} from "./chat-page/main/chat-messages/chat-messages.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ChatService} from "./services/chat-service/chat.service";
import {SideBarModule} from "./chat-page/side-bar/side-bar.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MainPageRoutingModule} from "./main-page-routing.module";

const routes: Routes = [

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
    SideBarModule,
    ReactiveFormsModule,
    MainPageRoutingModule
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
