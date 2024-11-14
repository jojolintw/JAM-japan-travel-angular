import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { MyOrderDTO } from 'src/app/interface/Member/MyOrderDTO';
import { MyareaService } from 'src/app/service/Member/myarea.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent {

  constructor(private myareaService:MyareaService){}

@Output() gotoOrderDetailemit = new EventEmitter();

MyOrderDTO:MyOrderDTO[]=[]

ngOnInit(): void {
this.myareaService.GetAllMyorder().subscribe(data=>{
  this.MyOrderDTO = data;
  console.log(this.MyOrderDTO);
})

}








  goToOrderdetail(orderId:number)
  {
    sessionStorage.setItem('orderId',orderId.toString());
    this.gotoOrderDetailemit.emit('memberorderdetail');
  }
}

