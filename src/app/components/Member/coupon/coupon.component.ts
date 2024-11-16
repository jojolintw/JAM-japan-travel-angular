import { Component } from '@angular/core';
import { Mycoupon } from 'src/app/interface/Member/MyCoupon';
import { MyareaService } from 'src/app/service/Member/myarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent {

constructor(private myareaService:MyareaService){}

allmycoupon:Mycoupon [] =[];
allmyavailablecoupon:Mycoupon [] =[];
allmyusedcoupon:Mycoupon [] =[];
selectedSection='可使用'



ngOnInit(): void {
this.intoCouponPage();
}

intoCouponPage(){
  //取得所有我可以使用的優惠券=========================================================
this.myareaService.GetAllMycoupon().subscribe(data =>{
  this.allmycoupon = data;
  console.log('可使用',this.allmycoupon);
//取得所有我已使用的優惠券=========================================================
this.myareaService.GetAllMyUsedcoupon().subscribe(useddata =>{
  this.allmyusedcoupon =useddata;
  console.log('已使用',this.allmyusedcoupon);
})
//取得所有可以領取的優惠券
this.myareaService.GetAllMyAvailablecoupon().subscribe(availabledata=>{
  this.allmyavailablecoupon = availabledata;
  console.log('可領取',this.allmyavailablecoupon);
})
})
}



//======================================================
getCoupon(couponId:number)
{
  this.myareaService.Getoupon(couponId).subscribe(data =>{
    if(data.result==='success')
      {
        Swal.fire({
          icon: "success",
          title: "優惠券已領取",
          showConfirmButton: false,
          timer: 1000
        })
        this.intoCouponPage();
      }
  })
}







//轉換================================================
changetoA()
{
  this.selectedSection = '可使用';
}
changetoB()
{
  this.selectedSection = '已使用';
}
changetoC()
{
  this.selectedSection = '可領取';
}
}
