import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {

constructor(private router:Router){

}

ngOnInit(): void {
  window.scrollTo(0,0);
}

goToHomePage(){
  this.router.navigate(['home']);
}

goToMyOrder(){
  this.router.navigate(['member']);
}

}
