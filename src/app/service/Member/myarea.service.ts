import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlterMemDTO } from 'src/app/interface/Member/AlterMemDTO';
import { Area } from 'src/app/interface/Member/Area';
import { City } from 'src/app/interface/Member/City';
import { CityArea } from 'src/app/interface/Member/CityArea';
import { LoginMember } from 'src/app/interface/Member/LoginMember';
import { myComment } from 'src/app/interface/Member/myComment';
import { Mycoupon } from 'src/app/interface/Member/MyCoupon';
import { MyfavoriteItilities } from 'src/app/interface/Member/MyfavoriteItilities';
import { MyOrderDetailDTO } from 'src/app/interface/Member/MyOrderDetailDTO';
import { MyOrderDTO } from 'src/app/interface/Member/MyOrderDTO';

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
  //================================================================================================
  //取得地區資料
  GetAllCityArea() {
    return this.client.get<CityArea[]>('https://localhost:7100/api/Member/GetCityArea', { withCredentials: true })
  }
  //取得城市資料
  GetAllCitys(id: any) {
    return this.client.get<City[]>(`https://localhost:7100/api/Member/GetCity/${id}`, { withCredentials: true })
  }
  //取得所有日本地區資料
  GetAllArea() {
    return this.client.get<Area[]>('https://localhost:7100/api/Member/GetAllArea', { withCredentials: true })
  }
  //我的最愛相關=============================================================================================
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
  GetAllMyfavorites() {
    return this.client.get<MyfavoriteItilities[]>(`https://localhost:7100/api/Member/GetAllMyfavorite`, { withCredentials: true })
  }
  //取出所有地區分類的我的最愛
  GetAreaMyfavorites(para: number) {
    return this.client.get<MyfavoriteItilities[]>(`https://localhost:7100/api/Member/GetAreaMyfavorite/${para}`, { withCredentials: true })
  }

  //我的優惠券相關==========================================================
  //取出所有我的優惠券
  GetAllMycoupon() {
    return this.client.get<Mycoupon[]>(`https://localhost:7100/api/Coupon/GetAllMycoupon`, { withCredentials: true })
  }
  //取出所有我已使用的優惠券
  GetAllMyUsedcoupon() {
    return this.client.get<Mycoupon[]>(`https://localhost:7100/api/Coupon/GetAllMyUsedcoupon`, { withCredentials: true })
  }
  //取出所有我已使用的優惠券
  GetAllMyAvailablecoupon() {
    return this.client.get<Mycoupon[]>(`https://localhost:7100/api/Coupon/GetAllMyAvailablecoupon`, { withCredentials: true })
  }
  //領取優惠券
  Getoupon(para: number) {
    return this.client.get<any>(`https://localhost:7100/api/Coupon/Getoupon/${para}`, { withCredentials: true })
  }
  //我的訂單相關======================================================================
  //取得所有訂單
  GetAllMyorder() {
    return this.client.get<MyOrderDTO[]>(`https://localhost:7100/api/MyOrder/GetAllMyOrders`, { withCredentials: true })
  }
  //取得所有訂單明細======================================================================
  GetAllMyorderDetail(para: number) {
    return this.client.get<MyOrderDetailDTO[]>(`https://localhost:7100/api/MyOrder/GetOrderDetail/${para}`, { withCredentials: true })
  }
  //評論相關======================================================================================
  //取得評論
  GetItineraryinfo(para: number) {
    return this.client.get<myComment>(`https://localhost:7100/api/Member/GetCommentOrderDetailId/${para}`, { withCredentials: true })
  }
  InsertComment(para: myComment) {
    return this.client.post<any>(`https://localhost:7100/api/Member/AlterComment`,para, { withCredentials: true })
  }
}

