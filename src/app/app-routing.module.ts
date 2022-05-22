import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page-container/registration-login-page/home-page/home-page.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {LoginPageComponent} from "./home-page-container/registration-login-page/login-page/login-page.component";
import {RegistrationPageComponent} from "./home-page-container/registration-login-page/registration-page/registration-page.component";

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./main-page-container/main-page.module').then(m => m.MainPageModule) },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
