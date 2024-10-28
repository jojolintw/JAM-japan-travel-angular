import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private router:Router){}


  goToForgerpassword()
  {
     this.router.navigate(['login/forgetpassword'])
  }

goToSignup()
{
  this.router.navigate(['login/signup'])
}


}
