import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/Member/login.service';
import { LoginTransfer } from 'src/app/interface/Login/loginTransfer';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    const clientId = '1036675996892-vl38g44j5neom1qj25opevj04oebis4u.apps.googleusercontent.com';
    this.loginService.initGoogleOneTap(clientId);
  }


  loginTransfer: LoginTransfer =
    {
      email: 'winne1945@gmail.com',
      password: 'w1234567',
    }
  ErrorMessage =
    {
      ErrorEmail: '',
      ErrorPassword: ''
    }
  focus()
  {
    this.ErrorMessage.ErrorEmail='';
    this.ErrorMessage.ErrorPassword='';
  }
  //登入
  Login() {
   //空白驗證
   if(this.loginTransfer.email ===''&& this.loginTransfer.password==='')
    {
      this.ErrorMessage.ErrorEmail='Email不可空白';
      this.ErrorMessage.ErrorPassword='密碼不可空白';
      return;
    }
       if(this.loginTransfer.email ==='')
    {
      this.ErrorMessage.ErrorEmail='Email不可空白';
      return;
    }
       if(this.loginTransfer.password==='')
    {
      this.ErrorMessage.ErrorPassword='密碼不可空白';
      return;
    }
    //Email格式認證======================================
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(this.loginTransfer.email))
      {
        this.ErrorMessage.ErrorEmail ='請輸入正確的Email格式'
        return;
      }
    //Password 格式認證===================================
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!passwordRegex.test(this.loginTransfer.password))
      {
        this.ErrorMessage.ErrorPassword ='密碼為8位數以上且需要包含英文及數字'
        return;
      }
    //打API
    this.loginService.LoginApi(this.loginTransfer).subscribe(data => {
      if (data.result === 'ErrorAccount') {
        console.log(data);
        this.ErrorMessage.ErrorEmail = data.message
      }
      else if (data.result === 'ErrorPassword') {
        console.log(data);
        this.ErrorMessage.ErrorPassword = data.message
      }
      else if (data.result === 'success') {
        console.log(data);
        this.loginService.saveToken(data.token);
        this.router.navigate(['**'])
      }
    })
  }
  //註冊
  goToSignup() {
    this.router.navigate(['login/signup'])
  }
  //忘記密碼
  goToForgerpassword() {
    this.router.navigate(['login/forgetpassword'])
  }
}
