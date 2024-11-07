import { Component, OnInit } from '@angular/core';
import { Cart2Service } from '../../../service/Shipment/cart2.service'; // 引入CartService

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  discount: number = 0;

  constructor(private cart2Service: Cart2Service) {}

  ngOnInit() {
    this.cartItems = this.cart2Service.getItems(); // 獲取購物車項目
    this.calculateTotal();
  }

  // 計算總金額
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // 更改數量
  changeQuantity(item: any, amount: number) {
    item.quantity += amount;
    if (item.quantity < 1) item.quantity = 1;
    this.calculateTotal();
  }

  // 移除購物車項目
  removeCartItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.ItinerarySystemId !== itemId);
    this.calculateTotal();
  }

  // 清除購物車
  clearCart() {
    this.cartItems = [];
    this.totalAmount = 0;
    this.discount = 0;
    this.cart2Service.clearCart();
  }

  // 前往結帳頁面
  goToCheckout() {
    // 結帳頁面邏輯
    console.log("前往結帳");
  }
}