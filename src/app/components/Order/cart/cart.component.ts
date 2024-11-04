import { LocalstorageService } from './../../../service/Order/localstorage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private router: Router,
              private localstorageService:LocalstorageService) {

  }


  setcontent(){
    const textcontent = document.getElementById('textcontent');
    if(textcontent)
      {
        const textContentElement = document.getElementById('textcontent') as HTMLInputElement;
        if (textContentElement) {
          const textContentValue = textContentElement.value;
          this.localstorageService.setItem('text3', textContentValue);
      }
      }
  }

  getcontent(){
    var text =  this.localstorageService.getItem('text1');
    alert(text);
  }

  removecontent(){
    this.localstorageService.removeItem('text2');
  }

  clearcontent(){
    this.localstorageService.clearItem();
  }

  getMemberInfo(){
    this.localstorageService.getMemberInfo();
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
