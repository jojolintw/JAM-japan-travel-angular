import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Itinerary } from '../../interface/Product/itinerary.interface';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { ActivityName } from 'src/app/interface/Product/Activities';


@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  apiUrl = 'https://localhost:7100/api/Product';  // 請確認這是您的後端API正確的端口號

  constructor(private http: HttpClient) { }

  getActivityNames(): Observable<ActivityName[]> {
    return this.http.get<ActivityName[]>(`${this.apiUrl}/activityNames`);
  }

  getItinerariesByRegion(region: number): Observable<any> {
    // 需要在后端ProductController添加对应的接口
    return this.http.get<Itinerary[]>(`${this.apiUrl}/region/${region}`);
  }

  getItineraries(): Observable<Itinerary[]> {
    return this.http.get<Itinerary[]>('https://localhost:7100/api/Product/list');
  }

  getItineraryById(id: number): Observable<ItineraryDetail[]> {
    return this.http.get<ItineraryDetail[]>(`${this.apiUrl}/${id}`);
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token'); // 假設token存在localStorage中
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }

  // 需要驗證的API調用可以這樣寫：
  getItinerariesWithAuth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`, this.getHttpOptions());
  }
}
