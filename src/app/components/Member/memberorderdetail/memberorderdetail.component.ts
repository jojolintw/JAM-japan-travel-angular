import { Component } from '@angular/core';
import { MyOrderDetailDTO } from 'src/app/interface/Member/MyOrderDetailDTO';
import { MyareaService } from 'src/app/service/Member/myarea.service';

@Component({
  selector: 'app-memberorderdetail',
  templateUrl: './memberorderdetail.component.html',
  styleUrls: ['./memberorderdetail.component.css']
})
export class MemberorderdetailComponent {

  constructor(private myareaService: MyareaService){}


  myOrderDetailDTO:MyOrderDetailDTO[]=[]

  ngOnInit(): void {
  const orderid = sessionStorage.getItem('orderId')
  this.myareaService.GetAllMyorderDetail(parseInt(orderid as string)).subscribe(data =>{
  this.myOrderDetailDTO = data;
  console.log('傳回的訂單明細',this.myOrderDetailDTO);

})

  }
}
