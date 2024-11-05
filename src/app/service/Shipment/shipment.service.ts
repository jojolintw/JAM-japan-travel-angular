import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface Shipment {
  routeId: number;
  originPortName: string;
  destinationPortName: string;
  price: number;
  routeDescription: string;
  imageUrl?: string; // 預設的圖片URL
  imageBase64?: string; // 新增屬性用於存儲Base64編碼
}


@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'https://localhost:7100/api/Shipment';
  private imageApiUrl = 'https://localhost:7100/api/Shipment/GetRouteImage';

  constructor(private http: HttpClient) {}

  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl).pipe(
      switchMap((shipments: Shipment[]) =>
        forkJoin(
          shipments.map(shipment =>
            this.getRouteImage(shipment.routeId).pipe(
              map(response => {
                // 如果獲取成功，則設置 imageUrl，否則設置為預設圖片
                shipment.imageUrl = response.imageUrl || 'assets/img/Shipment/8.jpg';
                return shipment; // 返回更新過的運輸資料
              }),
              catchError(() => {
                // 錯誤處理，設置為預設圖片
                shipment.imageUrl = 'assets/img/Shipment/5.jpg';
                return of(shipment); // 返回運輸資料
              })
            )
          )
        )
      )
    );
  }

  getRouteImage(routeId: number): Observable<{ imageUrl: string }> {
    return this.http.get<{ imageUrl: string }>(`${this.imageApiUrl}/${routeId}`);
  }
}
