import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from "./chat-page-container/chat/text-box/text-box.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ChatMessagesComponent } from "./chat-page-container/chat/chat-messages/chat-messages.component";
import { SharedModule } from "../shared/shared.module";
import { SideBarModule } from "./side-bar/side-bar.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MainPageRoutingModule } from "./main-page-routing.module";
import { PersonalPageComponent } from './chat-page-container/personal-page/personal-page.component';
import { SubRoomsSideBarComponent } from "./chat-page-container/chat/sub-rooms-side-bar/sub-rooms-side-bar.component";
import { ChannelsPageComponent } from './chat-page-container/channels-page/channels-page.component';
import { ChatPageModule } from "./chat-page-container/chat-page.module";

@NgModule({
  declarations: [
    TextBoxComponent,
    MainPageComponent,
    ChatMessagesComponent,
    PersonalPageComponent,
    SubRoomsSideBarComponent,
    ChannelsPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SideBarModule,
    ReactiveFormsModule,
    MainPageRoutingModule,
    ChatPageModule
  ],
  providers: [],
  exports: [
    TextBoxComponent,
    MainPageComponent,
    ChatMessagesComponent,
    SubRoomsSideBarComponent,
  ]
})
export class MainPageModule { }
