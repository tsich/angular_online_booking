import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AppComponent } from './app.component';

// add a new routes array to store the paths that you will use when routing to each page.
const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'home', component: AppComponent },
  // { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
