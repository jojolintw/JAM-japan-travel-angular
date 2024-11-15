import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyOrderDetailDTO } from 'src/app/interface/Member/MyOrderDetailDTO';
import { MyareaService } from 'src/app/service/Member/myarea.service';
import { MycommentComponent } from '../mycomment/mycomment.component';

@Component({
  selector: 'app-memberorderdetail',
  templateUrl: './memberorderdetail.component.html',
  styleUrls: ['./memberorderdetail.component.css']
})
export class MemberorderdetailComponent {

  constructor(private myareaService: MyareaService,private dialog: MatDialog){}


  myOrderDetailDTO:MyOrderDetailDTO[]=[]

  ngOnInit(): void {
  const orderid = sessionStorage.getItem('orderId')
  this.myareaService.GetAllMyorderDetail(parseInt(orderid as string)).subscribe(data =>{
  this.myOrderDetailDTO = data;
  console.log('傳回的訂單明細1',data);
  console.log('傳回的訂單明細2',this.myOrderDetailDTO);
})
  }

  gotoComment(para:number)
  {
    sessionStorage.setItem('ordertetailId',para.toString())
    this.dialog.open(MycommentComponent);
  }
}
