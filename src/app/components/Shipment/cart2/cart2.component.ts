import { Component, OnInit } from '@angular/core';
import { Cart2Service } from '../../../service/Shipment/cart2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  discount: number = 100;
  selectedSchedule: any;
  selectedSeats: number = 1;

  constructor(
    private cart2Service: Cart2Service,
  private router: Router) {
    }
  ngOnInit() {
    this.cartItems = this.cart2Service.getItems(); // 獲取購物車項目
    this.calculateTotal();
  }

  // 計算總金額
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.schedule.price * item.seats), 0);
  }

  // 更改數量
  changeQuantity(item: any, amount: number) {
    item.seats += amount;
    if (item.seats < 1) item.seats = 1;
    this.calculateTotal();
  }

  // 移除購物車項目
  removeCartItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.schedule.routeId !== itemId);
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
    this.router.navigate(['orderconfirmation']);
  }
}
