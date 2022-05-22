import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchTextFormatterPipe } from './pipes/search-text-formatter.pipe';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, PageNotFoundComponent, SearchTextFormatterPipe],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  exports: [
    HeaderComponent, FooterComponent, SearchTextFormatterPipe
  ]
})
export class SharedModule { }
