import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AlterMemDTO } from 'src/app/interface/Member/AlterMemDTO';
import { City } from 'src/app/interface/Member/City';
import { CityArea } from 'src/app/interface/Member/CityArea';
import { LoginMember } from 'src/app/interface/Member/LoginMember';
import { MyareaService } from 'src/app/service/Member/myarea.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private router: Router, private myareaService: MyareaService) {

  }

  @Input() loginTransfer: LoginMember =
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
      Password: null,
      MemberLevelId: null,
      MemberLevel: null,
      MemberStatusId: null,
      MemberStatus: null,
      Photopath: null,
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
      Password: null,
      ImagePath: null,
    }

  cityAreas: CityArea[] = [];
  citys: City[] = [];
  ngOnInit(): void {
    this.myareaService.GetAllCityArea().subscribe(data => {
      this.cityAreas = data;
      this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata=>{
           this.citys = citydata;
      })
    })
  }
  getcity()
  {
    this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata =>
      {
        console.log(citydata);
        this.citys = citydata;
      })
  }




  save() {


    // 開始存值
    this.alterMemDTO.MemberName = this.loginTransfer.ChineseName;
    if (this.loginTransfer.EnglishName != null) {
      this.alterMemDTO.EnglishName = this.loginTransfer.EnglishName;
    }
    if (this.loginTransfer.Gender != null) {
      this.alterMemDTO.Gender = this.loginTransfer.Gender;
    }
    if (this.loginTransfer.Birthday != null) {
      this.alterMemDTO.Birthday = this.loginTransfer.Birthday;
    }
    if (this.loginTransfer.CityId != null) {
      this.alterMemDTO.CityId = this.loginTransfer.CityId;
    }
    if (this.loginTransfer.Phone != null) {
      this.alterMemDTO.Phone = this.loginTransfer.Phone;
    }
    this.alterMemDTO.Email = this.loginTransfer.Email;
    if (this.loginTransfer.Photopath != null) {
      this.alterMemDTO.ImagePath = this.loginTransfer.Photopath;
    }
    this.myareaService.AlterMemberInfo(this.alterMemDTO).subscribe(data =>
      {
        console.log(data);
      })



  }
}
