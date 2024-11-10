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

  private authSubscription: any;
  constructor(private router: Router, private loginService: LoginService) { }

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
