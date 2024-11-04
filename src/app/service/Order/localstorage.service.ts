import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';
import { apiresponse, memberInfo } from 'src/app/interface/Order/memberInfo';
import { Observable } from 'rxjs';
import { cartItem } from 'src/app/interface/Order/cartItem';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private cartkey = 'cart'
  constructor(private client: HttpClient) { }

  addToCart(item:cartItem)
    {
      const cart = this.getCartItems();

      const existingItem = cart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity; // 更新數量
      } else {
        cart.push(item); // 新增商品
      }

      localStorage.setItem(this.cartkey, JSON.stringify(cart)); // 儲存到 localStorage
      alert('商品已加入購物車');
    };

  getCartItems(): cartItem[] {
    return JSON.parse(localStorage.getItem(this.cartkey) || '[]') as cartItem[];
  }

  removeCartItem(itemId:number){
    const cart = this.getCartItems(); // 獲取當前購物車
    const updatedCart = cart.filter(cartItem => cartItem.id !== itemId); // 過濾掉要刪除的商品

    localStorage.setItem(this.cartkey, JSON.stringify(updatedCart)); // 儲存更新後的購物車
    alert('商品已從購物車刪除');
  }

  clearCartItems(){
    localStorage.removeItem(this.cartkey);
  }



  // =============== test =====================

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

  // ====================================

  getMemberInfo(): Observable<apiresponse> {
    return this.client.get<apiresponse>('https://localhost:7100/api/Order/GetLoginMember');
  }
}

