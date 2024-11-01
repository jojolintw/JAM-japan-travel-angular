import { CouponService } from './../../../service/Member/coupon.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/Member/login.service';
import { LoginInput } from 'src/app/interface/Login/loginInput';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private router:Router, private loginService :LoginService,private couponService:CouponService){}

  Inputuser:LoginInput=
  {
    email:'',
    password:'',
    token:''
  }

  Login()
  {
    this.loginService.LoginApi(this.Inputuser).subscribe(data => {
      console.log(data.token);
      this.loginService.saveToken(data.token);
    })
  }






goToForgerpassword()
  {
    //  this.router.navigate(['login/forgetpassword'])
    this.couponService.getCoupons().subscribe(data=>
      {
        console.log(data)
      })
  }

goToSignup()
{
  this.router.navigate(['login/signup'])

}


}
