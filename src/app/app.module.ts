import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RoomsSideBarComponent } from './pages/rooms-side-bar/rooms-side-bar.component';
import { SubRoomsSideBarComponent } from './pages/sub-rooms-side-bar/sub-rooms-side-bar.component';
import { MainChatComponent } from './pages/main-chat/main-chat.component';
import { UserListBarComponent } from './pages/user-list-bar/user-list-bar.component';
import { MainSideBarComponent } from './pages/main-side-bar/main-side-bar.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'main', component: MainPageComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    RoomsSideBarComponent,
    SubRoomsSideBarComponent,
    MainChatComponent,
    UserListBarComponent,
    MainSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
