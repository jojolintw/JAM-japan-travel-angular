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

  // 添加一个属性来追踪侧边栏状态
  isSideMenuOpen = false;

  // 切换侧边栏的方法
  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  // 关闭侧边栏的方法
  closeSideMenu() {
    this.isSideMenuOpen = false;
  }

}
