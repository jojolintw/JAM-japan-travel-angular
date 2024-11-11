import { CheckoutService } from './../../../service/Order/checkout.service';
import { memberInfo } from './../../../interface/Order/memberInfo';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { cartItem } from 'src/app/interface/Order/cartItem';
import { error } from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: cartItem[] = []
  quantity = 1;
  productTotalAmount = 0;
  totalAmount = 0;
  discount = 100;
  memberName: String = '';
  phone: String = '';
  email: String = '';
  remarks: string = '';
  coupon: number = 0;
  selectedCoupon: number=100;

  constructor(private router: Router,
    private localstorageService: LocalstorageService, private checkoutService:CheckoutService) {
  }

  ngOnInit(): void {
    this.cartItems = this.localstorageService.getCartItems();
    this.calculateTotal();

    this.localstorageService.getMemberInfo().subscribe(
      (response) => {
        localStorage.setItem("memberId",response.loginmember.memberId.toString()) ;
        this.memberName = response.loginmember.chineseName;

        // 去除phone前後的"
        this.phone = JSON.stringify(response.loginmember.phone);
        if(this.phone.substring(0,1)=='"'){
          this.phone = this.phone.substring(1,this.phone.length);
        }
        if(this.phone.substring(this.phone.length-1)=='"'){
          this.phone = this.phone.substring(0,this.phone.length-1);
        }

        // 去除email前後的"
        this.email = JSON.stringify(response.loginmember.email);
        if(this.email.substring(0,1)=='"'){
          this.email = this.email.substring(1,this.email.length);
        }
        if(this.email.substring(this.email.length-1)=='"'){
          this.email = this.email.substring(0,this.email.length-1);
        }
      },
      (error) => {
        // console.error('獲取會員資訊失敗', error);
        // alert('獲取會員資訊失敗，重新登入');
      }
    );
  }

  calculateTotal(){
    this.productTotalAmount = this.cartItems.reduce((total, item)=>{
    return total + (item.price * item.quantity);
    },0);
    this.totalAmount = this.productTotalAmount-this.discount
    localStorage.setItem('totalAmount',this.totalAmount.toString());
  }

  saveCoupon(event: any){
    this.discount = event.target.value;
    localStorage.setItem("discount",this.discount.toString());
  }


  removeCartItemAll(){
    this.localstorageService.removeCart();      // 清除localStorage中key為cart的資料
  }                                             // 使用時機為訂單成立存入資料庫後即清除


  checkout() {
    Swal.fire({
      title: "確定要提交訂單嗎",
      icon: "warning",
      showCancelButton: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    }).then((resulte)=>{
      if(resulte.isConfirmed){
        // 提交訂單
        this.checkoutService.submitOrder().subscribe(
          (response)=>{
            console.log("提交並儲存訂單成功");
          },
          (error)=>{
            console.log("提交失敗");
          }
        );

        // 寄送email
        // this.checkoutService.sendOrderInfoEmail().subscribe(
        //   (response)=>{
        //     console.log("寄送成功",response);
        //   },
        //   (error)=>{
        //     console.log("fail",error);
        //   }
        // );

        // 下單成功頁面
        // this.router.navigate(['orderconfirmation']);

        // 清除購物車 localStorage => key:cart
        // this.localstorageService.removeCart();
      }
    });
  }

  linepay(){

  }


  demo(){
    this.remarks = "已回購，小孩愛吃";
    return this.remarks;
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

}
