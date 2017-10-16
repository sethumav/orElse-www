import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../service/auth.service';
import { DataSource } from '@angular/cdk';
import { DatePipe } from '@angular/common';
import { MaterialModule, MdProgressSpinnerModule } from '@angular/material';
import { MdDialog, MdDialogConfig } from '@angular/material';
@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  user: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.user = new User('', '');
    this.user = authService.user;
  }
  auth() {
    this.authService.authenticate(this.user);
    this.router.navigate(['/addcr']);
  }
}
