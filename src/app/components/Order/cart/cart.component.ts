import { LocalstorageService } from './../../../service/Order/localstorage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/interface/Order/cartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: cartItem[] = []
  quantity = 1
  totalAmount = 0
  discount = 100

  newItem: cartItem = {
    id: 2,            // 商品 ID
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
    const cartItem = this.cartItems.find(product => product.id === item.id);
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
    // const textcontent = document.getElementById('textcontent');
    // if (textcontent) {
    //   const textContentElement = document.getElementById('textcontent') as HTMLInputElement;
    //   if (textContentElement) {
    //     const textContentValue = textContentElement.value;
    //     this.localstorageService.setItem('text3', textContentValue);
    //   }
    // }

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

  // =============== checkbox ===================



  // ================ router ==================

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToProductDetail() {
    this.router.navigate(['itinerary-detail/1'])
  }



}
