import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/Member/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  cartItemsCount = 0;
  private cartSubscription: Subscription | undefined;
  private authSubscription: any;
  constructor(private router: Router, private loginService: LoginService, private localstorageService: LocalstorageService) { }

  isLoggedIn = false;

  ngOnInit(): void {
    this.loginService.isLoginApi().subscribe(data => {
      if (data.result === 'successlogin') {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    })
    this.authSubscription = this.loginService.isLoggedIn$.subscribe(
      (loggedInStatus) => {
        this.isLoggedIn = loggedInStatus;
      }
    );
//========================================================================
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
  //登出
  logout() {
    this.loginService.removejwtToken();
    this.isLoggedIn = false;
    this.router.navigate(['**']);
  }

  goToMemberArea() {

        if(this.isLoggedIn ===true)
          {
            this.router.navigate([`member`])
          }
        else
        {
          Swal.fire({
            icon: "error",
            title: "請先登入",
            showConfirmButton: false,
          })
        }
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
