import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./registration-login-page/home-page/home-page.component";
import {MainPageComponent} from "../main-page/chat-page/main-page/main-page.component";


const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
