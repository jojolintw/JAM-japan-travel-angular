import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { AlterMemDTO } from 'src/app/interface/Member/AlterMemDTO';
import { City } from 'src/app/interface/Member/City';
import { CityArea } from 'src/app/interface/Member/CityArea';
import { LoginMember } from 'src/app/interface/Member/LoginMember';
import { MyareaService } from 'src/app/service/Member/myarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private router: Router, private myareaService: MyareaService) {

  }
  cityAreas: CityArea[] = [];
  citys: City[] = [];

  @Input() selectedFile: File | null = null;
  @Input() loginTransfer: LoginMember =
    {
      MemberId: null,
      ChineseName: null,
      EnglishName: null,
      Gender: null,
      Birthday: null,
      CityAreaId: null,
      CityAreaName: null,
      CityId: 21,
      CityName: null,
      Phone: null,
      Email: null,
      MemberLevelId: null,
      MemberLevel: null,
      MemberStatusId: null,
      MemberStatus: null,
      ImageUrl: null,
      TotalAmount: 0
    }

  alterMemDTO: AlterMemDTO =
    {
      MemberName: null,
      EnglishName: null,
      Gender: null,
      Birthday: null,
      CityId: null,
      Phone: null,
      Email: null,
    }
  ErrorMessage =
    {
      NameErrMsg: '',
      EnglishNameErrMsg: '',
      PhoneErrMsg: '',
      EmailErrMsg: ''
    }


  @Output() reloadingEventEmiter = new EventEmitter();

  ngOnInit(): void {
    this.myareaService.GetAllCityArea().subscribe(data => {
      this.cityAreas = data;
      setTimeout(() => {
        this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata => {
          this.citys = citydata;
        })
      }, 500);
    })
  }

  getcity() {
    this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata => {
      this.citys = citydata;
    })
  }
  //取消errorMSG
  focus() {
    this.ErrorMessage.NameErrMsg = '';
    this.ErrorMessage.EnglishNameErrMsg = '';
    this.ErrorMessage.PhoneErrMsg = '';
    this.ErrorMessage.EmailErrMsg = '';
  }
  // 儲存修改資料=================================================================
  save() {
    //空白驗證==================================================================
    if (this.loginTransfer.ChineseName == '' && this.loginTransfer.Email=='') {
      this.ErrorMessage.NameErrMsg = '姓名不可空白';
      this.ErrorMessage.EmailErrMsg = 'Email不可空白';
      return;
    }
    if (this.loginTransfer.ChineseName == '') {
      this.ErrorMessage.NameErrMsg = '姓名不可空白';
      return;
    }
    if (this.loginTransfer.Email == '') {
      this.ErrorMessage.EmailErrMsg = 'Email不可空白';
      return;
    }
    //格式驗證=================================================================
    const englishRegex = /^[A-Za-z]+(([' -][A-Za-z ])?[A-Za-z]*)*$/;
    const phoneRegex = /^09\d{8}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!englishRegex.test(this.loginTransfer.EnglishName as string)&&!phoneRegex.test(this.loginTransfer.Phone as string)) {
      this.ErrorMessage.EnglishNameErrMsg = '請輸入正確的英文姓名格式';
      this.ErrorMessage.PhoneErrMsg = '請輸入正確的行動電話格式';
      return;
    }

    //英文姓名格式認證
    if (!englishRegex.test(this.loginTransfer.EnglishName as string)) {
      this.ErrorMessage.EnglishNameErrMsg = '請輸入正確的英文姓名格式'
      return;
    }
    //手機號碼格式認證

    if((this.loginTransfer.Phone as string)!=null)
      {
        if (!phoneRegex.test(this.loginTransfer.Phone as string)) {
          this.ErrorMessage.PhoneErrMsg = '請輸入正確的行動電話格式'
          return;
        }
      }
    //Email格式認證
    if (!emailRegex.test(this.loginTransfer.Email as string)) {
      this.ErrorMessage.EmailErrMsg = '請輸入正確的Email格式'
      return;
    }
    //產生FormData=============================================================
    const formData = new FormData();
    this.alterMemDTO.MemberName = this.loginTransfer.ChineseName;
    formData.append('MemberName', this.alterMemDTO.MemberName as string);
    if (this.loginTransfer.EnglishName != null) {
      this.alterMemDTO.EnglishName = this.loginTransfer.EnglishName;
      formData.append('EnglishName', this.alterMemDTO.EnglishName as string);
    }
    if (this.loginTransfer.Gender != null) {
      this.alterMemDTO.Gender = this.loginTransfer.Gender;
      formData.append('Gender', this.alterMemDTO.Gender as string);
    }
    if (this.loginTransfer.Birthday != null) {
      this.alterMemDTO.Birthday = this.loginTransfer.Birthday;
      formData.append('Birthday', this.alterMemDTO.Birthday as string);
    }
    if (this.loginTransfer.CityId != null) {
      this.alterMemDTO.CityId = this.loginTransfer.CityId;
      formData.append('CityId', this.alterMemDTO.CityId as any);
    }
    if (this.loginTransfer.Phone != null) {
      this.alterMemDTO.Phone = this.loginTransfer.Phone;
      formData.append('Phone', this.alterMemDTO.Phone as string);
    }
    if (this.loginTransfer.Email != null) {
      this.alterMemDTO.Email = this.loginTransfer.Email;
      formData.append('Email', this.alterMemDTO.Email as string);
    }
    if (this.selectedFile != null) {
      formData.append('file', this.selectedFile as Blob, this.selectedFile?.name);
    }
    //打API
    this.myareaService.AlterMemberInfo(formData).subscribe(data => {
      if (data.result === 'success') {
        this.reloadingEventEmiter.emit();
        Swal.fire({
          icon: "success",
          title: "儲存成功",
          showConfirmButton: false,
          timer: 2000
        })
      }
    })

  }
  cancel()
  {
    this.reloadingEventEmiter.emit();
  }
  //Demo
  DemoError()
  {
        this.loginTransfer.EnglishName='Doraemon8';
    this.loginTransfer.Phone = '09456852511';
  }
  Demo()
  {
    this.loginTransfer.EnglishName='Doraemon';
    this.loginTransfer.Phone = '0945685251';
  }
}
