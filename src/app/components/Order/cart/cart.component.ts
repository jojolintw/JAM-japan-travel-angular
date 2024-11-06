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

  showCouponModal: boolean = false;  // 控制彈出視窗顯示
  selectedCouponId: number | null = null;  // 儲存選中的優惠券 ID
  availableCoupons: Array<any> = [
    { id: 1, name: '驚喜大禮包', description: '消費滿1000元可以使用!', discount: 100 },
    { id: 2, name: '新用戶好理', description: '不限金額!', discount: 50 },
    { id: 3, name: '歡慶開學季', description: '消費滿500元可以使用!', discount: 150 },
    { id: 3, name: 'JAM 周年慶', description: '消費滿500元可以使用!', discount: 200 }
  ];



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

  // =============== coupon =====================
    // 開啟優惠券選擇視窗
    openCouponModal() {
      this.showCouponModal = true;
    }

    // 關閉優惠券選擇視窗
    closeCouponModal() {
      this.showCouponModal = false;
    }

    // 當選擇優惠券時應用優惠
    applyCoupon(coupon: any) {
      console.log('選擇的優惠券:', coupon);
      // 在這裡處理選擇優惠券後的邏輯，比如將優惠券應用到購物車
    }

  // =============== router =====================

  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToProductDetail(id:number) {
    this.router.navigate(['itinerary-detail/'+id])
  }



}
