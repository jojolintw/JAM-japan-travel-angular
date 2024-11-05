// shipment.service.ts
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
  nearestDepartureTime?: Date;
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
  private scheduleApiUrl = 'https://localhost:7100/api/Shipment/GetNearestDepartureTime';

  constructor(private http: HttpClient) {}

  getShipments(sort: string, departure: string, destination: string): Observable<Shipment[]> {
    let params = new HttpParams();
    if (departure) params = params.set('departure', departure);
    if (destination) params = params.set('destination', destination);
    if (sort) params = params.set('sort', sort);
  
    return this.http.get<Shipment[]>(this.apiUrl, { params }).pipe(
      switchMap((shipments: Shipment[]) =>
        forkJoin(
          shipments.map(shipment =>
            forkJoin({
              nearestDepartureTime: this.getNearestDepartureTime(shipment.routeId),
              image: this.getRouteImage(shipment.routeId).pipe(
                map(response => response.imageUrl || 'assets/img/Shipment/8.jpg'),
                catchError(() => of('assets/img/Shipment/5.jpg'))
              )
            }).pipe(
              map(({ nearestDepartureTime, image }) => ({
                ...shipment,
                nearestDepartureTime,
                imageUrl: image
              }))
            )
          )
        )
      ),
      map(shipments => {
        switch (sort) {
          case 'priceAsc':
            return shipments.sort((a, b) => a.price - b.price);
          case 'priceDesc':
            return shipments.sort((a, b) => b.price - a.price);
          case 'date':
            return shipments.sort((a, b) =>
              new Date(a.nearestDepartureTime || 0).getTime() - new Date(b.nearestDepartureTime || 0).getTime()
            );
          default:
            return shipments;
        }
      })
    );
  }
  

  getNearestDepartureTime(routeId: number): Observable<Date | undefined> {
    return this.http.get<{ nearestDepartureTime: Date }>(`${this.scheduleApiUrl}/${routeId}`).pipe(
      map(response => new Date(response.nearestDepartureTime)),
      catchError(() => of(undefined))
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
}