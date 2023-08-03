import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// classes to communicate with our API
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './_services/shared-service.service';
import { TokenInterceptor } from './helpers/token.interceptor';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

import { faXmarkCircle as fasXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faXmark as fasXmark } from '@fortawesome/free-solid-svg-icons';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, ListComponent, LoginComponent, LogoutComponent, RegisterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasXmarkCircle, fasXmark);
  }
}
