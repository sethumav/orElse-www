import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AddMobComponent } from './add-mob/add-mob.component';
import { ReviewComponent } from './review/review.component';

import { AppComponent } from './app.component';
import { MobListService } from './service/mob-list.service';
import { EmailService } from './service/email.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    AddMobComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [MobListService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
