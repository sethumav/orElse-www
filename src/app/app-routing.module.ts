import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMobComponent } from './add-mob/add-mob.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: '/addmob', pathMatch: 'full' },
  { path: 'addmob', component: AddMobComponent },
  { path: 'review', component: ReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }