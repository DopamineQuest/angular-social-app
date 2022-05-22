import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatPageRoutingModule} from "./chat-page-routing.module";
import { MessageChannelComponent } from './chat/message-channel/message-channel.component';
import { ChatTopBarComponent } from './chat/chat-top-bar/chat-top-bar.component';
import { SideTopBarComponent } from './chat/side-top-bar/side-top-bar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { DropDownComponent } from './chat/drop-down/drop-down.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    MessageChannelComponent,
    ChatTopBarComponent,
    SideTopBarComponent,
    DropDownComponent
  ],
  exports: [
    MessageChannelComponent,
    ChatTopBarComponent,
    SideTopBarComponent,

  ],
    imports: [
        CommonModule,
        ChatPageRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ChatPageModule { }
