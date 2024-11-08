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
  @Input() selectedFile: File | null =null ;
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
    }

  alterMemDTO: AlterMemDTO =
    {
      MemberName: null,
      EnglishName: null,
      Gender: null,
      Birthday: null,
      CityId: null,
      Phone: null,
    }

  cityAreas: CityArea[] = [];
  citys: City[] = [];

  @Output () saveEventEmiter = new EventEmitter();

  ngOnInit(): void {
    this.myareaService.GetAllCityArea().subscribe(data => {
      this.cityAreas = data;
      setTimeout(() => {
        this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata =>
          {
            this.citys=citydata;
          })
      }, 500);
    })
  }

  getcity()
  {
    this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata =>
      {
        this.citys = citydata;
      })
  }
  // sexchange()
  // {
  //   this.alterMemDTO.Gender = this.loginTransfer.Gender;
  //   console.log(this.alterMemDTO.Gender);
  // }

  save()
  {
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
    if (this.selectedFile != null) {
    formData.append('file', this.selectedFile as Blob, this.selectedFile?.name);
    }
    //打API
    this.myareaService.AlterMemberInfo(formData).subscribe(data =>
      {
          if(data.result ==='success')
            {
              this.saveEventEmiter.emit();
              Swal.fire({
                icon:"success",
                title:"儲存成功",
                showConfirmButton:false,
                timer:2000
              })
            }
      })
  }
 }
