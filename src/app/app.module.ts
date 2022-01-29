import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { MainPageComponent } from './chat-page/chat-page/main-page/main-page.component';
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RoomsSideBarComponent } from './chat-page/chat-page/rooms-side-bar/rooms-side-bar.component';
import { SubRoomsSideBarComponent } from './chat-page/chat-page/sub-rooms-side-bar/sub-rooms-side-bar.component';
import { MainChatComponent } from './chat-page/chat-page/main-chat/main-chat.component';
import { UserListBarComponent } from './chat-page/chat-page/user-list-bar/user-list-bar.component';
import { MainSideBarComponent } from './chat-page/chat-page/main-side-bar/main-side-bar.component';
import { RoomComponent } from './chat-page/chat-page/room/room.component';
import { TextBoxComponent } from './chat-page/chat-page/text-box/text-box.component';
import {ChatMessagesComponent} from "./chat-page/chat-page/chat-messages/chat-messages.component";
import {ChatPageModule} from "./chat-page/chat-page.module";
import {HomePageModule} from "./home-page/home-page.module";


// const routes: Routes = [
//    { path: 'main', component: MainPageComponent }
//   ];

@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatPageModule,
    HomePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
