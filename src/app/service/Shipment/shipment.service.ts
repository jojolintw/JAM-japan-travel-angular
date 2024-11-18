import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError,tap } from 'rxjs/operators';

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
  nextDeparture: Date;
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

export interface PortImage {
  portImageId: number;
  portId: number;
  portImageUrl: string;
  portImageDescription: string | null;
}



@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'https://localhost:7100/api/Shipment';
  private imageApiUrl = 'https://localhost:7100/api/Shipment/GetRouteImage';

  constructor(private http: HttpClient) {}

  getShipments(sortBy: string, originPort: string, destinationPort: string, pageNumber: number, pageSize: number, isAscending: boolean = true): Observable<{ data: Shipment[], totalRecords: number, pageNumber: number, pageSize: number }> {
    let params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('isAscending', isAscending.toString());

    if (originPort) params = params.set('originPort', originPort);
    if (destinationPort) params = params.set('destinationPort', destinationPort);
    if (sortBy) params = params.set('sortBy', sortBy);

    return this.http.get<{ data: Shipment[], totalRecords: number, pageNumber: number, pageSize: number }>(this.apiUrl, { params }).pipe(
      switchMap(response => {
        if (!response || !response.data) {
          console.error('Response data is undefined or null');
          return of({ data: [], totalRecords: 0, pageNumber: 1, pageSize: pageSize });
        }
        
        const shipmentsWithImages$ = response.data.map(shipment =>
          this.getRouteImage(shipment.routeId).pipe(
            map(imageResponse => ({
              ...shipment,
              imageUrl: imageResponse.imageUrl || 'assets/img/Shipment/8.jpg'
            })),
            catchError(() => of({
              ...shipment,
              imageUrl: 'assets/img/Shipment/5.jpg'
            }))
          )
        );

        return forkJoin(shipmentsWithImages$).pipe(
          map(shipmentsWithImages => ({
            data: shipmentsWithImages,
            totalRecords: response.totalRecords,
            pageNumber: response.pageNumber,
            pageSize: response.pageSize
          }))
        );
      }),
      catchError(error => {
        console.error('Error fetching shipments:', error);
        return of({ data: [], totalRecords: 0, pageNumber: 1, pageSize: pageSize });
      })
    );
}

getPortImages(portId: number): Observable<PortImage[]> {
  return this.http.get<PortImage[]>(`${this.apiUrl}/GetPortImages?portId=${portId}`).pipe(
    map((images) =>
      images.map((image) => ({
        ...image,
        portImageUrl: image.portImageUrl 
          ? `https://localhost:7100${image.portImageUrl}` // 添加完整的 URL 路径
          : 'assets/img/Shipment/19.jpg' // 默认图片路径
      }))
    ),
    tap((images) => console.log('Fetched port images with full URLs:', images)) // 检查数据
  );
}


getPortIdByDestinationPort(destinationPort: string): Observable<number> {
  return this.http.get<{ PortId: number }>(`${this.apiUrl}/GetPortIdByDestinationPort`, {
    params: { destinationPort }
  }).pipe(
    map(response => response.PortId),
    catchError(() => {
      console.error("PortId not found for the specified destination port.");
      return of(0); // 如果找不到，返回默认的PortId 0
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
