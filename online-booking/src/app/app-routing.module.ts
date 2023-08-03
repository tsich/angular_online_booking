import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './register/register.component';

// add a new routes array to store the paths that you will use when routing to each page.
const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
