import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from "./home-page-container/home-page.module";
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
