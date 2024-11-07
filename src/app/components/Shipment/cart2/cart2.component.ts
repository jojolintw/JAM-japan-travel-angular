
import { LocalstorageService } from './../../../service/Order/localstorage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/interface/Order/cartItem';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.css']
})
export class Cart2Component {

  cartItems: cartItem[] = []
  quantity = 1
  totalAmount = 0
  discount = 100

  newItem: cartItem = {
    ItinerarySystemId: 5,            // 商品 ID
    ItineraryDateSystemId:1,
    name: '商品BB',    // 商品名稱
    price: 888,       // 商品價格
    quantity: 10,      // 初始數量
    imagePath:'',     // 圖片路徑
  }


  constructor(private router: Router,
    private localstorageService: LocalstorageService) {

  }

  ngOnInit(): void {
    this.cartItems = this.localstorageService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(){
    this.totalAmount = this.cartItems.reduce((total, item)=>{
    return total + (item.price * item.quantity);
  },0);
  }

  removeCartItem(id:number){
    this.localstorageService.removeCartItem(id);
    this.ngOnInit();
  }

  clearCartItems(){
    this.localstorageService.clearCartItems();  // 清除所有localStorage 應該用不到但先放著
  }

  changeQuantity(item:any, delta: number) {
    const cartItem = this.cartItems.find(product => product.ItinerarySystemId === item.ItinerarySystemId);
    if (cartItem) {
      // 更新商品數量，防止數量小於1
      cartItem.quantity = Math.max(1, cartItem.quantity + delta);

      // 更新localStorage
      this.updateCart();
      this.ngOnInit();
    }

  }

  updateCart(){
    this.localstorageService.setItem('cart',JSON.stringify(this.cartItems));
  }

// ============== test ====================


  setcontent() {
    this.localstorageService.addToCart(this.newItem);
    this.ngOnInit();
  }

  getcontent() {
    var text = this.localstorageService.getItem('text1');
    alert(text);
  }

  removecontent() {
    this.localstorageService.removeCartItem(1);
  }

  clearcontent() {
    this.localstorageService.clearItem();
  }

  getMemberInfo() {
    this.localstorageService.getMemberInfo();
  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  // =============== router =====================

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToProductDetail(id:number) {
    this.router.navigate(['itinerary-detail/'+id])
  }



}
