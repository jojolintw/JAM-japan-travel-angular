import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forgetPasswordTransfer } from 'src/app/interface/Login/forgetPasswordTransfer';
import { LoginReturn } from 'src/app/interface/Login/loginReturn';
import { LoginTransfer } from 'src/app/interface/Login/loginTransfer';
import { Register } from 'src/app/interface/Login/Register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient) { }

  //將JWT Token 存於localStorage
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }
  //將忘記密碼的Email存於localStorage
  saveForgetPasswordEmail(email: string) {
    localStorage.setItem('forgerPasswordEmail', email);
  }
  //將忘記密碼的Email存於localStorage
  removeForgetPasswordEmail() {
    localStorage.removeItem('forgerPasswordEmail');
  }
  //從忘記密碼的localStorage取出Email
  getForgetPasswordEmail(): any {
    if (localStorage.getItem('forgerPasswordEmail') != null) {
      const forgetPasswordEmail = localStorage.getItem('forgerPasswordEmail');
      return forgetPasswordEmail;
    }
  }

  //登入的API
  LoginApi(para: LoginTransfer) {
    return this.client.post<LoginReturn>('https://localhost:7100/api/Login/Login', para, { withCredentials: true })
  }

  //註冊的API
  RegisterApi(para: Register) {
    return this.client.post<any>('https://localhost:7100/api/Login/Register', para, { withCredentials: true })
  }
  //寄驗證信的API
  SendCertificationMail() {
    return this.client.get<any>('https://localhost:7100/api/Login/sendCertificationEmail', { withCredentials: true })
  }
  //驗證信通過的API
  CertificationSuccess() {
    return this.client.get<any>('https://localhost:7100/api/Login/memberCertification', { withCredentials: true })
  }
  //忘記密碼寄信的API
  ForgetPasswortEmail(para: forgetPasswordTransfer) {
    return this.client.post<any>('https://localhost:7100/api/Login/forgetpasswordEmail', para, { withCredentials: true })
  }
  //重設密碼的API
  ResetPasswordAPI(para: forgetPasswordTransfer) {
    return this.client.post<any>('https://localhost:7100/api/Login/resetPassword', para, { withCredentials: true })
  }
}
