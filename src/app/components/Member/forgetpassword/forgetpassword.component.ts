import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/Member/login.service';
import { LoginTransfer } from 'src/app/interface/Login/loginTransfer';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  loginTransfer: LoginTransfer =
    {
      email: '',
      password: '',
    }
  errormessage = '';

  constructor(private loginService: LoginService, private router: Router) { }

  resetpassword() {
    //空白驗證
    if (this.loginTransfer.email === '') {
      this.errormessage = 'Email不可空白';
      return;
    }
    //Email格式驗證
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.loginTransfer.email)) {
      this.errormessage = '請輸入正確的Email格式'
      return;
    }
    //呼叫忘記密碼寄信的API
    this.loginService.ForgetPasswortEmail(this.loginTransfer).subscribe(data => {
      if (data.result === 'fail') {
        this.errormessage = data.message
      }
      if (data.result === 'success') {
        this.router.navigate(['login/resetpassword'])
      }
    })
  }
}
