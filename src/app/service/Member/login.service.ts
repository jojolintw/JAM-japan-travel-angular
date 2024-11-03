import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginReturn } from 'src/app/interface/Login/loginReturn';
import { LoginTransfer } from 'src/app/interface/Login/loginTransfer';
import { Register } from 'src/app/interface/Login/Register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient) { }



  //將JWT Token 存於SessionStorage
  saveToken(token: string) {
    sessionStorage.setItem('jwtToken', token);
  }

  //登入的API
  LoginApi(para: LoginTransfer) {
    return this.client.post<LoginReturn>('https://localhost:7100/api/Login/Login', para, { withCredentials: true })
  }

  //註冊的API
  RegisterApi(para: Register) {
    return this.client.post<any>('https://localhost:7100/api/Login/Register', para, { withCredentials: true })
  }
    //註冊的API
    SendMail() {
      return this.client.get('https://localhost:7100/api/Login/SendEmail', { withCredentials: true })
    }
}
