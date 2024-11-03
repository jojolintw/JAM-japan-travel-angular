import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/interface/Login/Register';
import { LoginService } from 'src/app/service/Member/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router,private loginService: LoginService) { }

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
    //Email格式驗證
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.inputRegister.RegisterEmail)) {
      this.ErrorMessage.ErrorEmail = '請輸入正確的Email格式'
      return;
    }
    //Password 格式認證===================================
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(this.inputRegister.RegisterPassword)) {
      this.ErrorMessage.ErrorPassword = '密碼為8位數以上且需要包含英文及數字'
      return;
    }
    //打API
    this.loginService.RegisterApi(this.inputRegister).subscribe(data => {

      if (data['result'] === 'repeataccount') {
        this.ErrorMessage.ErrorEmail = data['message'];
        return
      }
      if (data['result'] === 'success') {
        this.router.navigate(['**'])
      }
    })
  }
  SendMail()
  {
    this.loginService.SendMail().subscribe(data => {
      console.log(data);
    })
  }

}
