import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlterMemDTO } from 'src/app/interface/Member/AlterMemDTO';
import { City } from 'src/app/interface/Member/City';
import { CityArea } from 'src/app/interface/Member/CityArea';
import { LoginMember } from 'src/app/interface/Member/LoginMember';

@Injectable({
  providedIn: 'root'
})
export class MyareaService {

  constructor(private client: HttpClient) { }
  //取得會員資料
  GoToMyArea() {
    return this.client.get<any>('https://localhost:7100/api/Member/GetLoginMember', { withCredentials: true })
  }
  //修改會員資料
  AlterMemberInfo(para: AlterMemDTO) {
    return this.client.post<any>('https://localhost:7100/api/Member/AlterMemberinformation', para,{ withCredentials: true })
  }

  //取得地區資料
  GetAllCityArea() {
    return this.client.get<CityArea[]>('https://localhost:7100/api/Member/GetCityArea', { withCredentials: true })
  }
  //取得城市資料
  GetAllCitys(id: any) {
    return this.client.get<City[]>(`https://localhost:7100/api/Member/GetCity/${id}`, { withCredentials: true })
  }
}

