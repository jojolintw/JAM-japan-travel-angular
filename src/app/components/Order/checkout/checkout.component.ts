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

  setRemarks(event:any){
    this.remarks = event.target.value;
    localStorage.setItem("remarks",this.remarks);
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
    this.calculateTotal();
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


            this.createOrder();

            // 下單成功頁面
            this.router.navigate(['orderconfirmation']);

            // 清除購物車 localStorage => key:cart
            this.localstorageService.removeCart();


          },
          (error)=>{
            console.log("提交失敗");
          }
        );

        // 後端Create Order會跟著一起寄信
        // 寄送email
        // this.checkoutService.sendOrderInfoEmail().subscribe(
        //   (response)=>{
        //     console.log("寄送成功",response);
        //   },
        //   (error)=>{
        //     console.log("fail",error);
        //   }
        // );


      }
    });
  }


  demo(){
    this.remarks = "已回購，小孩愛吃";
    localStorage.setItem("remarks",this.remarks)
  }

  goToCart() {
    this.router.navigate(['cart']);
  }


  createOrder(){
    const amount = localStorage.getItem('totalAmount');
    const orderId = localStorage.getItem('memberId') + Date.now().toString()
    const lineorderData={
      orderId:orderId,
      amount:Number(amount),
      currency:"TWD",
      productName:"Japan Activity Memory(JAM)商品",
      confirmUrl:"",
      cancelUrl:"",
    }
    console.log(lineorderData);



  this.checkoutService.linepay(lineorderData).subscribe(
    (response) => {
      // 假設後端返回的 response 是包含 paymentUrl 的物件
      console.log('LinePay 回應:', response);

      // 檢查回應中是否有支付頁面 URL
      if (response && response.paymentUrl) {
        console.log('支付頁面 URL:', response.paymentUrl);
        // 可以根據需要將使用者導向支付頁面
        window.location.href = response.paymentUrl; // 跳轉到支付頁面
      } else {
        // 如果回應中沒有 paymentUrl，顯示回傳的 code 或其他訊息
        console.error('支付頁面 URL 未返回', response);
      }
    },
    (error) => {
      // 處理 API 請求失敗的情況
      console.error('LinePay 請求錯誤:', error);
    }
  );


  }
}
