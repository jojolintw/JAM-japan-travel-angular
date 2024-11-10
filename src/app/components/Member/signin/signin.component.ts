import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/service/Member/login.service';
import { LoginTransfer } from 'src/app/interface/Login/loginTransfer';
import { googleLoginTransfer } from 'src/app/interface/Member/googleLoginTransfer';
import { MatDialog } from '@angular/material/dialog';
import { RegistercompleleComponent } from '../registercomplele/registercomplele.component';

declare var google: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) { }

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
  googleLoginTransfer: googleLoginTransfer =
    {
      token: '',
    }
  focus() {
    this.ErrorMessage.ErrorEmail = '';
    this.ErrorMessage.ErrorPassword = '';
  }
  //登入
  Login() {
    //空白驗證
    if (this.loginTransfer.email === '' && this.loginTransfer.password === '') {
      this.ErrorMessage.ErrorEmail = 'Email不可空白';
      this.ErrorMessage.ErrorPassword = '密碼不可空白';
      return;
    }
    if (this.loginTransfer.email === '') {
      this.ErrorMessage.ErrorEmail = 'Email不可空白';
      return;
    }
    if (this.loginTransfer.password === '') {
      this.ErrorMessage.ErrorPassword = '密碼不可空白';
      return;
    }
    //Email格式認證======================================
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.loginTransfer.email)) {
      this.ErrorMessage.ErrorEmail = '請輸入正確的Email格式'
      return;
    }
    //Password 格式認證===================================
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(this.loginTransfer.password)) {
      this.ErrorMessage.ErrorPassword = '密碼為8位數以上且需要包含英文及數字'
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
        this.loginService.savejwtToken(data.token);
        this.loginService.isLoggedInSubject.next(true);
        this.router.navigate(['**'])
      }
    })
  }
  //進註冊頁
  goToSignup() {
    this.router.navigate(['login/signup'])
  }
  //忘記密碼
  goToForgerpassword() {
    this.router.navigate(['login/forgetpassword'])
  }
  //google登入註冊===================================================================
  loginBygoogle() {
    const clientId = '1036675996892-13kj599u894qc8s4k87g7p6pbhskaibd.apps.googleusercontent.com';
    this.initGoogleOneTap(clientId);
  }

  public initGoogleOneTap(clientId: string): void {
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.prompt();
  }

  private handleCredentialResponse(response: any): void {
    const idToken = response.credential;
    console.log(idToken);
    this.googleLoginTransfer.token = idToken;
    this.loginService.sendTokenToBackend(this.googleLoginTransfer).subscribe((res) => {
      if (res.result === 'successregester') {
        this.loginService.savejwtToken(res.token);
        this.loginService.isLoggedInSubject.next(true);
        this.loginService.SendCertificationMail().subscribe(dataCertification => {
          if (dataCertification.result === 'success') {
            this.dialog.open(RegistercompleleComponent);
            this.router.navigate(['**'])
          }
        })
      }
      else if (res.result === 'successlogin') {
        this.loginService.savejwtToken(res.token);
        this.loginService.isLoggedInSubject.next(true);
        this.router.navigate(['**']);
      }
    });
  }
}
