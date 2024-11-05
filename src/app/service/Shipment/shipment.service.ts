import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface Shipment {
  routeId: number;
  originPortName: string;
  destinationPortName: string;
  price: number;
  routeDescription: string;
  nearestDepartureTime?: Date; // 新增屬性儲存最近的出發時間
  imageUrl?: string; // 預設的圖片URL
  imageBase64?: string; // 新增屬性用於存儲Base64編碼
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'https://localhost:7100/api/Shipment';
  private imageApiUrl = 'https://localhost:7100/api/Shipment/GetRouteImage';
  private scheduleApiUrl = 'https://localhost:7100/api/Shipment/GetNearestDepartureTime';

  constructor(private http: HttpClient) {}

  // 新增篩選和排序功能的 getShipments 方法
  getShipments(sort: string, departure: string, destination: string): Observable<Shipment[]> {
    let params = new HttpParams();
    if (departure) params = params.set('departure', departure);
    if (destination) params = params.set('destination', destination);

    return this.http.get<Shipment[]>(this.apiUrl, { params }).pipe(
      switchMap((shipments: Shipment[]) =>
        forkJoin(
          shipments.map(shipment =>
            forkJoin({
              // 獲取最近的出發時間
              nearestDepartureTime: this.getNearestDepartureTime(shipment.routeId),
              // 獲取圖片 URL
              image: this.getRouteImage(shipment.routeId).pipe(
                map(response => response.imageUrl || 'assets/img/Shipment/8.jpg'),
                catchError(() => of('assets/img/Shipment/5.jpg'))
              )
            }).pipe(
              map(({ nearestDepartureTime, image }) => {
                shipment.nearestDepartureTime = nearestDepartureTime;
                shipment.imageUrl = image;
                return shipment;
              })
            )
          )
        )
      ),
      // 排序邏輯：根據價格、日期等進行排序
      map(shipments => {
        switch (sort) {
          case 'priceAsc':
            return shipments.sort((a, b) => a.price - b.price);
          case 'priceDesc':
            return shipments.sort((a, b) => b.price - a.price);
          case 'date':
            return shipments.sort((a, b) =>
              new Date(a.nearestDepartureTime || 0).getTime() -
              new Date(b.nearestDepartureTime || 0).getTime()
            );
          default:
            return shipments;
        }
      })
    );
  }

  // 獲取最近的未來出發時間
  getNearestDepartureTime(routeId: number): Observable<Date | undefined> {
    return this.http.get<{ nearestDepartureTime: Date }>(`${this.scheduleApiUrl}/${routeId}`).pipe(
      map(response => new Date(response.nearestDepartureTime)),
      catchError(() => of(undefined)) // 錯誤處理，如果無法獲取則返回 undefined
    );
  }

  // 獲取圖片 URL
  getRouteImage(routeId: number): Observable<{ imageUrl: string }> {
    return this.http.get<{ imageUrl: string }>(`${this.imageApiUrl}/${routeId}`);
  }
}
