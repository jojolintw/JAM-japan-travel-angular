import { Component, OnInit } from '@angular/core';
// import { Route, Router } from '@angular/router';
import { Route, Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoginService } from './service/Member/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 routerSubscription: Subscription;
export class AppComponent {

  constructor(private router: Router) {}
  isLoggedIn = false;
  title = 'JP_Angular';

}
