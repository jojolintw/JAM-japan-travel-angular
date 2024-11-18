import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Register } from 'src/app/interface/Login/Register';
import { LoginService } from 'src/app/service/Member/login.service';
import { RegistercompleleComponent } from '../registercomplele/registercomplele.component';
import Swal from 'sweetalert2';

//我不是機器人相關
declare var grecaptcha: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) { }

  //我不是機器人相關
  captchaResponse: string | null = null;
  recaptchaRendered = false;
  //===================================================
  inputRegister: Register =
    {
      RegisterName: '',
      RegisterEmail: '',
      RegisterPassword: ''
    }
  ErrorMessage =
    {
      ErrorName: '',
      ErrorEmail: '',
      ErrorPassword: ''
    }
  focus() {
    this.ErrorMessage.ErrorName = '';
    this.ErrorMessage.ErrorEmail = '';
    this.ErrorMessage.ErrorPassword = '';
  }

  Register() {
    //空白驗證
    if (this.inputRegister.RegisterName === '' && this.inputRegister.RegisterEmail === '' && this.inputRegister.RegisterPassword === '') {
      this.ErrorMessage.ErrorName = '使用者名稱不可空白';
      this.ErrorMessage.ErrorEmail = 'Email不可空白';
      this.ErrorMessage.ErrorPassword = '密碼不可空白';
      return;
    }
    if (this.inputRegister.RegisterName === '' && this.inputRegister.RegisterEmail === '') {
      this.ErrorMessage.ErrorName = '使用者名稱不可空白';
      this.ErrorMessage.ErrorEmail = 'Email不可空白';
      return;
    }
    if (this.inputRegister.RegisterName === '' && this.inputRegister.RegisterPassword === '') {
      this.ErrorMessage.ErrorName = '使用者名稱不可空白';
      this.ErrorMessage.ErrorPassword = '密碼不可空白';
      return;
    }
    if (this.inputRegister.RegisterEmail === '' && this.inputRegister.RegisterPassword === '') {
      this.ErrorMessage.ErrorEmail = 'Email不可空白';
      this.ErrorMessage.ErrorPassword = '密碼不可空白';
      return;
    }
    if (this.inputRegister.RegisterName === '') {
      this.ErrorMessage.ErrorName = '使用者名稱不可空白';
      return;
    }
    if (this.inputRegister.RegisterEmail === '') {
      this.ErrorMessage.ErrorEmail = 'Email不可空白';
      return;
    }
    if (this.inputRegister.RegisterPassword === '') {
      this.ErrorMessage.ErrorPassword = '密碼不可空白';
      return;
    }
    //格式驗證
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!emailRegex.test(this.inputRegister.RegisterEmail)&&!passwordRegex.test(this.inputRegister.RegisterPassword)) {
      this.ErrorMessage.ErrorEmail = '請輸入正確的Email格式';
      this.ErrorMessage.ErrorPassword = '密碼為8位數以上且需要包含英文及數字';
      return;
    }

    //Email格式驗證
    if (!emailRegex.test(this.inputRegister.RegisterEmail)) {
      this.ErrorMessage.ErrorEmail = '請輸入正確的Email格式'
      return;
    }
    //Password 格式認證===================================
    if (!passwordRegex.test(this.inputRegister.RegisterPassword)) {
      this.ErrorMessage.ErrorPassword = '密碼為8位數以上且需要包含英文及數字'
      return;
    }
    //我不是機器人認證
    if (this.captchaResponse) {
       //打註冊API
    this.loginService.RegisterApi(this.inputRegister).subscribe(data => {

      if (data['result'] === 'repeataccount') {
        this.ErrorMessage.ErrorEmail = data['message'];
        return
      }
      if (data['result'] === 'success') {
        this.loginService.savejwtToken(data.token);
        this.loginService.isLoggedInSubject.next(true);
        this.loginService.SendCertificationMail().subscribe(dataCertification => {
          if (dataCertification.result === 'success') {
            this.dialog.open(RegistercompleleComponent);
            this.router.navigate(['**'])
          }
        })
      }
    })
    }
    else
    {
      Swal.fire({
        icon: "error",
        title: "請完成我不是機器人驗證",
        showConfirmButton: false,
      })
    }
  }
    // 初始化 reCAPTCHA
    ngAfterViewChecked(): void {
      if (!this.recaptchaRendered) {
        grecaptcha.render('recaptcha-container', {
          sitekey: '6Le6oHoqAAAAAPL4kjsNmc3Uyd9WIadivdAKzCnR',
          callback: (response: string) => this.onCaptchaResolved(response),
        });
        this.recaptchaRendered = true;
      }
    }
     // 當 reCAPTCHA 被解決後，回調此函數
     onCaptchaResolved(captchaResponse: string) {
      console.log('reCAPTCHA 回應:', captchaResponse);
      this.captchaResponse = captchaResponse;
    }
    //去登入頁
    goTologin()
    {
      this.router.navigate(['login/signin']);
    }
    //Demo
    DemoDora()
    {
      this.inputRegister.RegisterName='多拉A夢';
      this.inputRegister.RegisterEmail='doraam1113333@gmail.com';
      this.inputRegister.RegisterPassword='d1234567';
    }
    DemoError()
    {
      this.inputRegister.RegisterName='多拉A夢';
      this.inputRegister.RegisterEmail='doraam1113333';
      this.inputRegister.RegisterPassword='d123456';
    }
    Demorepeat()
    {
      this.inputRegister.RegisterName='多拉A夢';
      this.inputRegister.RegisterEmail='winne1953@gmail.com';
      this.inputRegister.RegisterPassword='d1234567';
    }
    Clear()
    {
      this.inputRegister.RegisterName='';
      this.inputRegister.RegisterEmail='';
      this.inputRegister.RegisterPassword='';

      this.ErrorMessage.ErrorName = '';
      this.ErrorMessage.ErrorEmail = '';
      this.ErrorMessage.ErrorPassword = '';
    }
}
