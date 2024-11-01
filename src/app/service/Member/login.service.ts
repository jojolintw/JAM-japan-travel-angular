import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput } from 'src/app/interface/Login/loginInput';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client:HttpClient) { }
//將JWT Token 存於SessionStorage
saveToken(token: string) {
  sessionStorage.setItem('jwtToken', token);
}

  //登入的API
   LoginApi(para:LoginInput)
   {
    return this.client.post<LoginInput>('https://localhost:7100/api/Login/Login',para)
   }

}
