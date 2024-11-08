import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private client:HttpClient, private localStorageService:LocalstorageService) { }

  sendOrderInfoEmail(){
    return this.client.get<any>('https://localhost:7100/api/Order/sendOrderInfoEmail', { withCredentials: true });
  }

  submitOrder():Observable<any>{
    const cartitems = this.localStorageService.getCartItems();
    return this.client.post('https://localhost:7100/api/Order/CreateOrder',cartitems)
  }
}
