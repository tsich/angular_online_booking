import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmarkCircle as fasXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './shared-service.service';

@NgModule({
  declarations: [AppComponent, ListComponent],
  imports: [BrowserModule, FormsModule, FontAwesomeModule, AppRoutingModule],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasXmarkCircle, fasXmark);
  }
}
