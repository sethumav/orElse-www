import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONTENT } from './app.content';
import { AuthService, User } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _title = APP_CONTENT.app_title;
  private _user;
  constructor(
    private authService: AuthService,
    private router: Router) {
    this._user = authService.user;
  }
  get title(): string{
    return this._title;
  }
  get user(): User {
    return this._user;
  }
  logout() {
    this.authService.user = new User('', '');
    this._user = this.authService.user;
    this.router.navigate(['/auth']);
  }
}
