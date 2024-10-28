import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent {


@Output() gotoOrderDetailemit = new EventEmitter();


  goToOrderdetail()
  {
    this.gotoOrderDetailemit.emit('memberorderdetail');
  }





}

