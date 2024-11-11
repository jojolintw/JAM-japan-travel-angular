import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlterMemDTO } from 'src/app/interface/Member/AlterMemDTO';
import { City } from 'src/app/interface/Member/City';
import { CityArea } from 'src/app/interface/Member/CityArea';
import { LoginMember } from 'src/app/interface/Member/LoginMember';
import { MyfavoriteItilities } from 'src/app/interface/Member/MyfavoriteItilities';

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
  AlterMemberInfo(para: FormData) {
    return this.client.post<any>('https://localhost:7100/api/Member/AlterMemberinformation', para, { withCredentials: true })
  }

  //取得地區資料
  GetAllCityArea() {
    return this.client.get<CityArea[]>('https://localhost:7100/api/Member/GetCityArea', { withCredentials: true })
  }
  //取得城市資料
  GetAllCitys(id: any) {
    return this.client.get<City[]>(`https://localhost:7100/api/Member/GetCity/${id}`, { withCredentials: true })
  }
  //加入我的最愛
  Addtomyfavorite(id: any) {
    return this.client.get<any>(`https://localhost:7100/api/Member/AddtoMyfavirite/${id}`, { withCredentials: true })
  }
  //移除我的最愛
  Removemyfavorite(id: any) {
    return this.client.get<any>(`https://localhost:7100/api/Member/RemoveMyfavirite/${id}`, { withCredentials: true })
  }
  //確認是否為我的最愛
  Ismyfavorite(id: any) {
    return this.client.get<any>(`https://localhost:7100/api/Member/IsMyfavirite/${id}`, { withCredentials: true })
  }
  //取出所有我的最愛
  GetAllMyfavorites(){
    return this.client.get<MyfavoriteItilities[]>(`https://localhost:7100/api/Member/GetAllMyfacirite`, { withCredentials: true })
  }
}

