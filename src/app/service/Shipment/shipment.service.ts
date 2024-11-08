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
  imageUrl?: string;
  imageBase64?: string;
  originPortGoogleMap?: string;
  destinationPortGoogleMap?: string;
}

export interface PortDetail {
  portId: number;
  portName: string;
  city: string;
  cityDescription1: string;
  cityDescription2: string;
  portGoogleMap: string;
}

export interface ShipmentDetail {
  routeId: number;
  originPortName: string;
  destinationPortName: string;
  price: number;
  routeDescription: string;
  originPort: PortDetail;
  destinationPort: PortDetail;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'https://localhost:7100/api/Shipment';
  private imageApiUrl = 'https://localhost:7100/api/Shipment/GetRouteImage';

  constructor(private http: HttpClient) {}

  getShipments(sortBy: string, originPort: string, destinationPort: string): Observable<Shipment[]> {
    let params = new HttpParams();
    if (originPort) params = params.set('originPort', originPort);  // 更新為 API 的正確名稱
    if (destinationPort) params = params.set('destinationPort', destinationPort);  // 更新為 API 的正確名稱
    if (sortBy) params = params.set('sortBy', sortBy);  // 更新為 API 的正確名稱

    return this.http.get<Shipment[]>(this.apiUrl, { params }).pipe(
      switchMap((shipments: Shipment[]) => {
        // 將每個 shipment 資料加載圖片
        const shipmentsWithImages$ = shipments.map(shipment => 
          this.getRouteImage(shipment.routeId).pipe(
            map(response => ({
              ...shipment,
              imageUrl: response.imageUrl || 'assets/img/Shipment/8.jpg' // 預設圖片 1
            })),
            catchError(() => of({
              ...shipment,
              imageUrl: 'assets/img/Shipment/5.jpg' // 預設圖片 2
            }))
          )
        );
        return forkJoin(shipmentsWithImages$);
      }),
      map(shipments => {
        // 根據排序選項對資料進行排序
        switch (sortBy) {
          case 'priceAsc':
            return shipments.sort((a, b) => a.price - b.price);
          case 'priceDesc':
            return shipments.sort((a, b) => b.price - a.price);
          case 'latest':
            return shipments.sort((a, b) => b.routeId - a.routeId);
          default:
            return shipments.sort((a, b) => a.routeId - b.routeId);
        }
      }),
      catchError(error => {
        console.error('Error fetching shipments:', error);
        return of([]);
      })
    );
}



  getRouteImage(routeId: number): Observable<{ imageUrl: string }> {
    return this.http.get<{ imageUrl: string }>(`${this.imageApiUrl}/${routeId}`);
  }

  getShipmentDetail(routeId: number): Observable<ShipmentDetail> {
    return this.http.get<ShipmentDetail>(`${this.apiUrl}/${routeId}`).pipe(
      switchMap(detail =>
        this.getRouteImage(routeId).pipe(
          map(imageResponse => ({
            ...detail,
            imageUrl: imageResponse.imageUrl
          })),
          catchError(() => of({
            ...detail,
            imageUrl: 'assets/img/Shipment/default.jpg'
          }))
        )
      )
    );
  }

  getDestinations(departure: string): Observable<string[]> {
    let params = new HttpParams().set('departure', departure);
    return this.http.get<Shipment[]>(this.apiUrl, { params }).pipe(
      map(shipments => {
        const destinations = shipments.map(shipment => shipment.destinationPortName);
        return Array.from(new Set(destinations)); // 去重
      })
    );
  }
}
