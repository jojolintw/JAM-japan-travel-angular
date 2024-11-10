import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItemsCount = 0;
  private cartSubscription: Subscription | undefined;

  constructor(private router: Router, private localstorageService: LocalstorageService) {

  }

  ngOnInit(): void {
    this.cartSubscription = this.localstorageService.cartItemCountChanged.subscribe((count: number) => {
      this.cartItemsCount = count;
    });

    this.cartItemsCount = this.localstorageService.getCartItemCount();

  }

  ngOnDestroy(): void {
    // 清理訂閱
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  goToMemberArea() {
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
