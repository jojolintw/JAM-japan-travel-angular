import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityArea } from 'src/app/interface/Member/CityArea';
import { LoginMember } from 'src/app/interface/Member/LoginMember';

@Injectable({
  providedIn: 'root'
})
export class MyareaService {

  constructor(private client:HttpClient) { }
  //取得會員資料
  GoToMyArea()
  {
    return this.client.get<any>('https://localhost:7100/api/Member/GetLoginMember', { withCredentials: true })
  }
    //取得地區資料
    GetAllCityArea()
    {
      return this.client.get<CityArea[]>('https://localhost:7100/api/Member/GetCityArea', { withCredentials: true })
    }
}

