import { Component } from '@angular/core';
import { APP_CONTENT } from './app.content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _title = APP_CONTENT.app_title;
  get title(): string{
    return this._title;
  }
}
