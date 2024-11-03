import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
    Gender: null  ,
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

   cityAreas: CityArea[] = [];
   ngOnInit(): void {
     this.myareaService.GetAllCityArea().subscribe(data =>
      {
        console.log(data);
        this.cityAreas= data;
      })
   }





   save()
   {
     console.log(this.cityAreas);
   }
}
