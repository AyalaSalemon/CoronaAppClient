import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoronaAppClient';
  constructor(private _router: Router) {

  }
  navigateToLogin() {
    this._router.navigate(['login']);
  }
  navigateToReportsPage() {
    this._router.navigate(['reports']);
  }
  navigateToHomePage() {
    this._router.navigate(['']);

  }
}
