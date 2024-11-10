import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/Member/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

constructor(private router:Router, private loginService:LoginService){}

@Input() isLoggedIn = false;

ngOnInit(): void {
  this.loginService.isLoginApi().subscribe(data =>
    {
      if(data.result==='successlogin')
        {
          this.isLoggedIn = true;
        }
        else
        {
          this.isLoggedIn = false;
        }

    })
}
//登出
logout()
{
this.loginService.removejwtToken();
this.isLoggedIn = false;
this.router.navigate(['**']);
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
