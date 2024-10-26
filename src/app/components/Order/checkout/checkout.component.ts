import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private router: Router) {

  }

goToConfirmation(){
  this.router.navigate(['orderconfirmation'])
}

}
