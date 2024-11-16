import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { lineorder } from 'src/app/interface/Order/lineorder';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private client:HttpClient, private localStorageService:LocalstorageService) { }

  // sendOrderInfoEmail(){
  //   return this.client.get<any>('https://localhost:7100/api/Order/sendOrderInfoEmail', { withCredentials: true });
  // }

  getformattedtime():string {
    const currenttime = new Date();

    const year = currenttime.getFullYear(); // 獲取年份
    const month = String(currenttime.getMonth() + 1).padStart(2, '0'); // 獲取月份（注意：JavaScript的月份從0開始，所以要+1）
    const day = String(currenttime.getDate()).padStart(2, '0'); // 獲取日期
    const hours = String(currenttime.getHours()).padStart(2, '0'); // 獲取小時
    const minutes = String(currenttime.getMinutes()).padStart(2, '0'); // 獲取分鐘

    // 返回格式化的日期字符串
    return `${year}${month}${day}${hours}${minutes}`;
  }

  submitOrder():Observable<any>{
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const couponId = localStorage.getItem('couponId') || '';
    const remarks = localStorage.getItem('remarks') || '';
    const totalAmount = localStorage.getItem('totalAmount') || '';
    const memberId = localStorage.getItem('memberId');
    const orderId = localStorage.getItem('memberId');
    const currenttime = this.getformattedtime();


    const orderData = {
      // orderId:orderId,
      cart:cartItems,
      orderNumber:orderId + currenttime,
      couponId:couponId,
      remarks:remarks,
      totalAmount:totalAmount,
      memberId:memberId
    }
    console.log(orderData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.post('https://localhost:7100/api/Order/CreateOrder',orderData,{headers})
  }

  linepay():Observable<any>{
    const totalAmount = localStorage.getItem('totalAmount') || '';
    const orderId = localStorage.getItem('memberId');
    const currenttime = this.getformattedtime();
    const remarks = localStorage.getItem('remarks') || '';

    const checkout = {
      price:totalAmount,
      couponId:orderId + currenttime,
      address:remarks,
      amount:totalAmount
    }
    console.log(checkout);
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.client.post('https://localhost:7100/api/LinePay/RequestPayment', checkout,{headers});
  }




  }
