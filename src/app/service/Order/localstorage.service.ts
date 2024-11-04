import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';
import { apiresponse, memberInfo } from 'src/app/interface/Order/memberInfo';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private client: HttpClient) { }

  addCartItem(memberId: number,
    productId: number,
    productName: string,
    quantity: number,
    price: number,)
    {
    const cartItem = {
      memberId,
      productId,
      productName,
      quantity,
      price
    };
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    var getdata = localStorage.getItem(key);
    return getdata;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearItem() {
    localStorage.clear();
  }

  getMemberInfo(){
    return this.client.get<apiresponse>('https://localhost:7100/api/Member/GetLoginMember').subscribe(
      (response) =>{
        const memberId = JSON.stringify(response.loginmember.memberId);
        const memberName = JSON.stringify(response.loginmember.chineseName);
        const phone = JSON.stringify(response.loginmember.phone);
        const email = JSON.stringify(response.loginmember.email);
        localStorage.setItem('memberId',memberId);
        localStorage.setItem('memberName',memberName);
        localStorage.setItem('phone',phone);
        localStorage.setItem('email',email);
      },
      (error) =>{
        console.error('獲取會員資訊失敗', error);
        alert('獲取失敗');
      }

    );
  }

}
