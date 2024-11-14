import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoginService } from './service/Member/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  title = 'JP_Angular';



}
