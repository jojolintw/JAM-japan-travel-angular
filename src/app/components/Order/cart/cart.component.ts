import { MyareaService } from 'src/app/service/Member/myarea.service';
import { LocalstorageService } from './../../../service/Order/localstorage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mycoupon } from 'src/app/interface/Member/MyCoupon';
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
  mycoupons:Mycoupon[] = []
  couponId = 0

  demoItem: cartItem[] = [{
    ItinerarySystemId: 2,
    itineraryDateSystemId: 3053,
    name: '「川平灣」SUP/獨木舟可供選擇★',
    price: 5000,
    quantity: 4,
    imagePath: '',
  }, {
    ItinerarySystemId: 22,
    itineraryDateSystemId: 3079,
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
    private localstorageService: LocalstorageService, private myareaService:MyareaService) {
      localStorage.removeItem("discount");
      localStorage.removeItem("couponId");

  }

  ngOnInit(): void {
    this.cartItems = this.localstorageService.getCartItems();
    this.calculateTotal();

    // 從 localStorage 讀取已選的優惠券 ID 和折扣
    const storedCouponId = localStorage.getItem('couponId');
    const storedDiscount = localStorage.getItem('discount');

    if (storedCouponId) {
      this.couponId = +storedCouponId;  // 設置選中的優惠券
    }

    if (storedDiscount) {
      this.discount = +storedDiscount;  // 設置折扣
    }

    this.myareaService.GetAllMycoupon().subscribe(coupons=>{
      this.mycoupons = coupons;
      // console.log(this.mycoupons);
    })
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
    window.scrollTo(0,0);
  }

  changeQuantity(item: any, delta: number) {
    const cartItem = this.cartItems.find(product => product.itineraryDateSystemId === item.itineraryDateSystemId);
    if (cartItem) {
      // 更新商品數量，防止數量小於1
      cartItem.quantity = Math.max(1, cartItem.quantity + delta);

      // 更新localStorage
      this.updateCart();
      // this.ngOnInit();
      this.calculateTotal();
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
    if(localStorage.getItem("jwtToken"))
    {
      this.router.navigate(['checkout']);
    }
    else
    {
      Swal.fire({
        icon: "warning",
        title: "請先登入會員",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  // =============== router =====================

  goToProductList() {
    this.router.navigate(['itinerary-list']);
  }

  goToProductDetail(id: number) {
    this.router.navigate(['itinerary-detail/' + id])
  }

  saveCoupon(event: any) {
    const selectedCouponId = this.couponId;

    // this.couponId = event.target.value;
    localStorage.setItem("couponId",selectedCouponId.toString());

    const selectCoupon = this.mycoupons.find(coupon=>coupon.couponId === +this.couponId)
    if(selectCoupon){
      this.discount = Number(selectCoupon.discount);
      localStorage.setItem("discount",selectCoupon.discount.toString());
    }

    if(this.couponId==0){
      this.discount=0;
      localStorage.removeItem("couponId");
      localStorage.removeItem("discount");
    }

    this.calculateTotal();
  }

}
