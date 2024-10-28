import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberarea',
  templateUrl: './memberarea.component.html',
  styleUrls: ['./memberarea.component.css']
})




export class MemberareaComponent {

  constructor(private router:Router)
  {

  }
  selectedComponent = 'account';








  goToAccount()
  {
    this.selectedComponent = 'account';
  }
  goToMycollection()
  {
    this.selectedComponent = 'mycollection';
  }
  goToMyOrder()
  {
    this.selectedComponent = 'myorder';
  }
  goToOrderDetail(newvalue:string)
  {
    this.selectedComponent = newvalue;
  }
  goToMyCoupon()
  {
    this.selectedComponent = 'coupon';
  }



}
