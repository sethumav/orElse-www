import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AddMobComponent } from './add-mob/add-mob.component';
import { ReviewComponent } from './review/review.component';
import { AddCrComponent } from './add-cr/add-cr.component';

const routes: Routes = [
  { path: '', redirectTo: '/addcr', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'addmob', component: AddMobComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'addcr', component: AddCrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }