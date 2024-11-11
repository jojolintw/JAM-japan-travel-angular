import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private client:HttpClient, private localStorageService:LocalstorageService) { }

  sendOrderInfoEmail(){
    return this.client.get<any>('https://localhost:7100/api/Order/sendOrderInfoEmail', { withCredentials: true });
  }

  submitOrder():Observable<any>{
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const couponId = localStorage.getItem('couponId') || '';
    const remarks = localStorage.getItem('remarks') || '';
    const totalAmount = localStorage.getItem('totalAmount') || '';
    const memberId = localStorage.getItem('memberId');


    const orderData = {
      cart:cartItems,
      couponId:0,
      remarks:remarks,
      totalAmount:totalAmount,
      memberId:memberId
    }
    console.log(orderData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.post('https://localhost:7100/api/Order/CreateOrder',orderData,{headers})
  }

  // linepay(){


  //   return this.client.post('https://localhost:7100/api/Order/CreateOrder')
  // }



  }
