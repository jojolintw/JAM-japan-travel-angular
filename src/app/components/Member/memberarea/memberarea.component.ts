import { LoginMember } from 'src/app/interface/Member/LoginMember';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyareaService } from 'src/app/service/Member/myarea.service';

@Component({
  selector: 'app-memberarea',
  templateUrl: './memberarea.component.html',
  styleUrls: ['./memberarea.component.css']
})




export class MemberareaComponent {

  constructor(private router: Router, private myareaService: MyareaService) {

  }
  selectedComponent = 'account';
 loginTransfer: LoginMember =
    {
      MemberId: null,
      ChineseName: null,
      EnglishName: null,
      Gender: null ,
      Birthday: null ,
      CityAreaId:null ,
      CityAreaName:null ,
      CityId: null,
      CityName:null ,
      Phone:null ,
      Email: null,
      Password:null ,
      MemberLevelId: null,
      MemberLevel:null ,
      MemberStatusId:null ,
      MemberStatus:null ,
      Photopath:null,
    }




  ngOnInit(): void {
    this.myareaService.GoToMyArea().subscribe(data => {
      this.loginTransfer.MemberId = data.loginmember.memberId;
      this.loginTransfer.ChineseName =data.loginmember.chineseName;
      this.loginTransfer.EnglishName =data.loginmember.englishName;
      this.loginTransfer.Gender = data.loginmember.gender;
      this.loginTransfer.Birthday = data.loginmember.birthday.substring(0, 10);
      this.loginTransfer.CityAreaId = data.loginmember.cityAreaId;
      this.loginTransfer.CityAreaName = data.loginmember.cityAreaName;
      this.loginTransfer.CityId = data.loginmember.cityId;
      this.loginTransfer.CityName = data.loginmember.cityName;
      this.loginTransfer.Phone = data.loginmember.phone;
      this.loginTransfer.Email = data.loginmember.email;
      this.loginTransfer.Password = data.loginmember.password;
      this.loginTransfer.MemberLevelId = data.loginmember.memberLevelId;
      this.loginTransfer.MemberLevel = data.loginmember.memberLevel;
      this.loginTransfer.MemberStatusId = data.loginmember.memberStatusId;
      this.loginTransfer.MemberStatus = data.loginmember.memberStatus;
      this.loginTransfer.Photopath = data.photopath;
    })
  }

  goToAccount() {
    this.selectedComponent = 'account';
  }
  goToMycollection() {
    this.selectedComponent = 'mycollection';
  }
  goToMyOrder() {
    this.selectedComponent = 'myorder';
  }
  goToOrderDetail(newvalue: string) {
    this.selectedComponent = newvalue;
  }
  goToMyCoupon() {
    this.selectedComponent = 'coupon';
  }
}
