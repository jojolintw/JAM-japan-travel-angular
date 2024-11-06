import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
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
      CityId: 21,
      CityName: null,
      Phone: null,
      Email: null,
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
      ImagePath: null,
    }

  cityAreas: CityArea[] = [];
  citys: City[] = [];

  @Output () saveEventEmiter = new EventEmitter();

// ngOnInit(): void {
//   this.myareaService.GetAllCityArea().subscribe(areadata =>
//     {
//       this.cityAreas=areadata;
//       this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citydata =>
//         {
//           this.citys = citydata;
//         })
//     })
// }

  //   ngOnInit(): void {
  //   zip(
  //     this.myareaService.GetAllCityArea(),
  //     this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId)
  //   ).subscribe(([cityAreas,citys]) => {
  //     this.cityAreas = cityAreas;
  //     this.citys = citys;
  //   });
  // }
  //   ngOnInit(): void {
  //     this.myareaService.GetAllCityArea().subscribe(cityAreas => {
  //       this.cityAreas = cityAreas;

  //       // 假設從 cityAreas 中取得 CityAreaId
  //       this.loginTransfer.CityAreaId = cityAreas[0]?.cityAreaId; // 根據您的實際需求選擇正確的索引或條件

  //       this.myareaService.GetAllCitys(this.loginTransfer.CityAreaId).subscribe(citys => {
  //         this.citys = citys;
  //       });
  //     });
  // }

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
          if(data.result ==='success')
            {

              this.saveEventEmiter.emit();
            }
      })



  }
}
