import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "../main-page/main-page.component";
import {PersonalPageComponent} from "./personal-page/personal-page.component";
import {ChannelsPageComponent} from "./channels-page/channels-page.component";
import {
  RegistrationPageComponent
} from "../../home-page-container/registration-login-page/registration-page/registration-page.component";

const routes: Routes = [
  { path: '', component: MainPageComponent,
    children: [
      { path: 'channels', component: ChannelsPageComponent },
      { path: 'personal', component: PersonalPageComponent },
      { path: '', redirectTo: 'personal', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatPageRoutingModule { }
