import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private router:Router){

}
  goToMemberArea()
  {
    this.router.navigate([`member`])
  }

  goToCart() {
    this.router.navigate(['cart'])
  }

  isSideMenuOpen = false;

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  closeSideMenu() {
    this.isSideMenuOpen = false;
  }

  goToItineraryList() {
    this.router.navigate(['/itinerary-list']);
  }

}
