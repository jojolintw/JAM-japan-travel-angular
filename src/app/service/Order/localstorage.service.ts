import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

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


}
