import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private Client:HttpClient)
   {

   }
   getCoupons(){
    // const token = sessionStorage.getItem('jwtToken'); // 獲取存儲在 localStorage 的 token
    // const headers = new HttpHeaders({
    //     Authorization: `Bearer ${token}` // 將 token 添加到標頭中
    // });

    return this.Client.get('https://localhost:7100/api/Login/GetLoginMember'); // 發送 GET 請求
}


}
