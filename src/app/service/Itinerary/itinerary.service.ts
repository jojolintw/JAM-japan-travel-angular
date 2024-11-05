import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Itinerary } from '../../interface/Product/itinerary.interface';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { Activity } from 'src/app/interface/Product/Activity';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  apiUrl = 'https://localhost:7100/api/Product';  // 請確認這是您的後端API正確的端口號

  constructor(private http: HttpClient) { }

  getActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activity`);
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
  searchItineraries(searchForm: any): Observable<Itinerary[]> {
    return this.http.post<Itinerary[]>(`${this.apiUrl}/api/Product/search`, searchForm);
  }
}
