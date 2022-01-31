import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatPageModule } from "./main-page/chat-page.module";
import { HomePageModule } from "./home-page/home-page.module";
import { SharedModule } from "./shared/shared.module";


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
    HomePageModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
