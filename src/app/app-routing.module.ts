import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMobComponent } from './add-mob/add-mob.component';

const routes: Routes = [
  { path: '', redirectTo: '/addmob', pathMatch: 'full' },
  { path: 'addmob', component: AddMobComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }