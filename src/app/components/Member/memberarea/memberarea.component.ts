import { LoginMember } from 'src/app/interface/Member/LoginMember';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MyareaService } from 'src/app/service/Member/myarea.service';
import { MyareaMember } from 'src/app/interface/Member/MyareaMember';

@Component({
  selector: 'app-memberarea',
  templateUrl: './memberarea.component.html',
  styleUrls: ['./memberarea.component.css']
})




export class MemberareaComponent {


  constructor(private router: Router, private myareaService: MyareaService) {

  }

  //檔案上傳相關
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedComponent = 'account';
  loginTransfer: LoginMember =
    {
      MemberId: null,
      ChineseName: null,
      EnglishName: null,
      Gender: null,
      Birthday: null,
      CityAreaId: null,
      CityAreaName: null,
      CityId: null,
      CityName: null,
      Phone: null,
      Email: null,
      MemberLevelId: null,
      MemberLevel: null,
      MemberStatusId: null,
      MemberStatus: null,
      Photopath: null,
    }

    myareaMember :MyareaMember =
    {
      ChineseName: null,
      Email: null,
      MemberLevelId: null,
      MemberLevel: null,
      MemberStatusId: null,
      MemberStatus: null,
      Photopath: null
    }

  ngOnInit(): void {
    this.getMemberData();
  }

  getMemberData()
  {
    this.myareaService.GoToMyArea().subscribe(data => {
      this.loginTransfer.MemberId = data.loginmember.memberId;
      this.loginTransfer.ChineseName = data.loginmember.chineseName;
      this.myareaMember.ChineseName = data.loginmember.chineseName;
      if (data.loginmember.englishName != null) {
        this.loginTransfer.EnglishName = data.loginmember.englishName;
      }
      if (data.loginmember.gender != null) {
        this.loginTransfer.Gender = data.loginmember.gender;
      }
      if (data.loginmember.birthday != null) {
        this.loginTransfer.Birthday = data.loginmember.birthday.substring(0, 10);
      }
      if (data.loginmember.cityAreaId != null) {
        this.loginTransfer.CityAreaId = data.loginmember.cityAreaId;
      }
      if (data.loginmember.cityAreaName != null) {
        this.loginTransfer.CityAreaName = data.loginmember.cityAreaName;
      }
      if (data.loginmember.cityId != null) {
        this.loginTransfer.CityId = data.loginmember.cityId;
      }
      if (data.loginmember.cityName != null) {
        this.loginTransfer.CityName = data.loginmember.cityName;
      }
      if (data.loginmember.phone != null) {
        this.loginTransfer.Phone = data.loginmember.phone;
      }

      this.loginTransfer.Email = data.loginmember.email;
      this.myareaMember.Email = data.loginmember.email;
      this.loginTransfer.MemberLevelId = data.loginmember.memberLevelId;
      this.myareaMember.MemberLevelId = data.loginmember.memberLevelId;
      this.loginTransfer.MemberLevel = data.loginmember.memberLevel;
      this.myareaMember.MemberLevel = data.loginmember.memberLevel;
      this.loginTransfer.MemberStatusId = data.loginmember.memberStatusId;
      this.myareaMember.MemberStatusId = data.loginmember.memberStatusId;
      this.loginTransfer.MemberStatus = data.loginmember.memberStatus;
      this.myareaMember.MemberStatus = data.loginmember.memberStatus;
      if (data.loginmember.photopath != null) {
        this.loginTransfer.Photopath = data.loginmember.photopath;
        this.myareaMember.Photopath = data.loginmember.photopath;
      }
    })
  }
  reloading()
  {
    this.getMemberData();
  }
//圖片上傳
onUploadClick()
{
  this.fileInput.nativeElement.click();
}
onFileSelected(event: Event)
{
  const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // 處理檔案上傳邏輯
      console.log('選中的檔案:', file);
    }
  }




  // 去別頁
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
