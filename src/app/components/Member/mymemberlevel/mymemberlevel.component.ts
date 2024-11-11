import { Component, Input } from '@angular/core';
import { LoginMember } from 'src/app/interface/Member/LoginMember';

@Component({
  selector: 'app-mymemberlevel',
  templateUrl: './mymemberlevel.component.html',
  styleUrls: ['./mymemberlevel.component.css']
})
export class MymemberlevelComponent {

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

  maxvalue = 0;

  percent=0;

  selectedComponent='memberlevel1';

  ngOnInit(): void {
    if (this.loginTransfer.MemberLevelId === 1) {
      this.maxvalue = 5000;
    }
    else {
      this.maxvalue = 20000;
    }
    this.percent = (this.loginTransfer.TotalAmount as number/this.maxvalue)*100
  //===========================================================================

    if(this.loginTransfer.MemberLevelId === 3)
      {
        this.selectedComponent='memberlevel3';
      }
    else if(this.loginTransfer.MemberLevelId === 2)
    {
      this.selectedComponent='memberlevel2';
    }
    else
      {
        this.selectedComponent='memberlevel1';
      }
  }


}
