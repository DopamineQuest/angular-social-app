import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./registration-login-page/home-page/home-page.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {HomePageRoutingModule} from "./home-page-routing.module";
import { LoginPageComponent } from './registration-login-page/login-page/login-page.component';
import { RegistrationPageComponent } from './registration-login-page/registration-page/registration-page.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [HomePageComponent, LoginPageComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
    FormsModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
