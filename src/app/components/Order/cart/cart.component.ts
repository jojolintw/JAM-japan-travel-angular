import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private router: Router) {

  }

  goToCheckout() {
    this.router.navigate(['checkout']);
  }


  goToHomePage() {
    this.router.navigate(['home']);
  }

  goToProductDetail(){
    this.router.navigate(['itinerary-detail/1'])
  }
}
