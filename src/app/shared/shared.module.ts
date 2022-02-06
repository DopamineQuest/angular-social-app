import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { UserService } from "./services/user-service/user.service";
import { SocketService } from "./services/socket-service/socket.service";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    SocketService
  ],
  exports: [
    HeaderComponent, FooterComponent
  ]
})
export class SharedModule { }
