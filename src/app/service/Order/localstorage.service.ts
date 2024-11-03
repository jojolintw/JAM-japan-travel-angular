import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setItem(key:string, value:string)
  {
    localStorage.setItem(key, value);
  }

  // setItem(memberId: number, productName: string, departureDate: string, quantity: number, price: number)
  // {
  //   const cartItem = {
  //     memberId,
  //     productName,
  //     departureDate,
  //     quantity,
  //     price
  //   };
  //   localStorage.setItem('cartItem', JSON.stringify(cartItem));
  // }

  getItem(key:string)
  {
   var getdata =  localStorage.getItem(key);
   return getdata;
  }

  removeItem(key:string)
  {
    localStorage.removeItem(key);
  }

  clearItem()
  {
    localStorage.clear();
  }


}
