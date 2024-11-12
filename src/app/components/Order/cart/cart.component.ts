import { LocalstorageService } from './../../../service/Order/localstorage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/interface/Order/cartItem';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: cartItem[] = []
  quantity = 1
  productTotalAmount = 0
  totalAmount = 0
  discount = 0

  demoItem: cartItem[] = [{
    ItinerarySystemId: 2,
    itineraryDateSystemId: 4,
    name: '【石垣島/半天】世界公認的「川平灣」SUP/獨木舟可供選擇★免費交通/照片數據，無需額外費用，接受當天預訂！',
    price: 7900,
    quantity: 4,
    imagePath: '',
  }, {
    ItinerarySystemId: 22,
    itineraryDateSystemId: 7,
    name: '溪流釣魚',
    price: 1254,
    quantity: 6,
    imagePath: '',
  }, {
    ItinerarySystemId: 1028,
    itineraryDateSystemId: 62,
    name: '北海道海鮮船釣放題~',
    price: 9000,
    quantity: 3,
    imagePath: '',
  }];


  constructor(private router: Router,
    private localstorageService: LocalstorageService) {

  }

  ngOnInit(): void {
    this.cartItems = this.localstorageService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.productTotalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    this.totalAmount = this.productTotalAmount - this.discount
    localStorage.setItem('totalAmount', this.totalAmount.toString());
  }

  removeCartItem(id: number) {
    this.localstorageService.removeCartItem(id);
    this.ngOnInit();
  }

  clearCartItems() {
    this.localstorageService.clearCartItems();  // 清除所有localStorage 應該用不到但先放著
    this.ngOnInit();
  }

  changeQuantity(item: any, delta: number) {
    const cartItem = this.cartItems.find(product => product.itineraryDateSystemId === item.itineraryDateSystemId);
    if (cartItem) {
      // 更新商品數量，防止數量小於1
      cartItem.quantity = Math.max(1, cartItem.quantity + delta);

      // 更新localStorage
      this.updateCart();
      this.ngOnInit();
    }

  }

  updateCart() {
    this.localstorageService.setItem('cart', JSON.stringify(this.cartItems));
  }

  // ============== test ====================


  setcontent() {
    // this.localstorageService.addToCart(this.cartItems);
    this.cartItems.push(...this.demoItem);
    this.localstorageService.setDemoCartItems(JSON.stringify(this.cartItems));
    this.ngOnInit();
  }

  // getcontent() {
  //   var text = this.localstorageService.getItem('text1');
  //   alert(text);
  // }

  // removecontent() {
  //   this.localstorageService.removeCartItem(1);
  // }

  // clearcontent() {
  //   this.localstorageService.clearItem();
  // }

  // getMemberInfo() {
  //   this.localstorageService.getMemberInfo();
  // }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  // =============== router =====================

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToProductDetail(id: number) {
    this.router.navigate(['itinerary-detail/' + id])
  }

  saveCoupon(event: any) {
    this.discount = event.target.value;
    // console.log(selectedCouponValue);
    localStorage.setItem("discount", this.discount.toString());
    this.calculateTotal();
  }

}
