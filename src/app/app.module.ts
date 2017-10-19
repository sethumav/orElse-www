import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { AuthComponent } from './auth/auth.component';
import { AddMobComponent } from './add-mob/add-mob.component';
import { ReviewComponent } from './review/review.component';

import { AppComponent } from './app.component';
import { MobListService } from './service/mob-list.service';
import { EmailService } from './service/email.service';
import { AuthService } from './service/auth.service';

import {SharedService } from './service/shared.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule, MdButtonModule, MdCheckboxModule, MdProgressSpinnerModule} from '@angular/material';
import {CalendarModule} from 'primeng/primeng';
import { AddMobDialogComponent } from './add-mob/dialog/add-mob.dialog';
import { OverrideRespPersonDialogComponent } from './add-mob/dialog/override-resp-person.dialog';

import { CrListService }  from './service/cr-list.service';
import { AddCrComponent } from './add-cr/add-cr.component';
import { AddCrDialogComponent } from './add-cr/dialog/add-cr.dialog';


import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    AddMobComponent,
    ReviewComponent,
    AddMobDialogComponent,
    OverrideRespPersonDialogComponent,
    AuthComponent,
    AddCrComponent,
    AddCrDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CalendarModule,
    MaterialModule,
    MdProgressSpinnerModule
  ],
  entryComponents: [
    AddMobDialogComponent, OverrideRespPersonDialogComponent, AddCrDialogComponent
  ],
  providers: [MobListService, EmailService, AuthService, SharedService, CrListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
