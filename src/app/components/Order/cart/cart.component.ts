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

  newItem: cartItem = {
    ItinerarySystemId: 3,            // 商品 ID
    itineraryDateSystemId:4,
    name: '商品C4',    // 商品名稱
    price: 333,       // 商品價格
    quantity: 2,      // 初始數量
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
    this.productTotalAmount = this.cartItems.reduce((total, item)=>{
    return total + (item.price * item.quantity);
    },0);
    this.totalAmount = this.productTotalAmount-this.discount
    localStorage.setItem('totalAmount',this.totalAmount.toString());
  }

  removeCartItem(id:number){
    this.localstorageService.removeCartItem(id);
    this.ngOnInit();
  }

  clearCartItems(){
    this.localstorageService.clearCartItems();  // 清除所有localStorage 應該用不到但先放著
  }

  changeQuantity(item:any, delta: number) {
    const cartItem = this.cartItems.find(product => product.itineraryDateSystemId === item.itineraryDateSystemId);
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
    localStorage.setItem('couponId','1');
    localStorage.setItem('remarks','123');
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

  saveCoupon(event: any){
    this.discount = event.target.value;
    // console.log(selectedCouponValue);
    localStorage.setItem("discount",this.discount.toString());
    this.calculateTotal();
  }

}
