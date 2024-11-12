import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { ItineraryList } from '../../interface/Product/itinerary-list.interface';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { Activity } from 'src/app/interface/Product/Activity';
import { HttpParams } from '@angular/common/http';
import { theme_Activity } from 'src/app/interface/Product/Theme-Activity';


@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  apiUrl = 'https://localhost:7100/api/Product';  // 請確認這是您的後端API正確的端口號

  constructor(private http: HttpClient) { }

  getActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activity`);
  }

  getAllThemeActivities(): Observable<theme_Activity[]> {
    return this.http.get<theme_Activity[]>(`${this.apiUrl}/theme_activities`);
  }

  getItinerariesByTheme(themeId: number): Observable<ItineraryList[]> {
    return this.http.get<ItineraryList[]>(`${this.apiUrl}/itineraries/theme/${themeId}`);
  }

  getItinerariesByActivity(activityId: number): Observable<ItineraryList[]> {
    return this.http.get<ItineraryList[]>(`${this.apiUrl}/itineraries/activity/${activityId}`);
  }

  getItinerariesByRegion(region: number): Observable<any> {
    // 需要在后端ProductController添加对应的接口
    return this.http.get<ItineraryList[]>(`${this.apiUrl}/region/${region}`);
  }

  getItineraries(): Observable<ItineraryList[]> {
    return this.http.get<ItineraryList[]>('https://localhost:7100/api/Product/list');
  }

  getItineraryById(id: number): Observable<ItineraryDetail> {
    return this.http.get<ItineraryDetail>(`${this.apiUrl}/detail/${id}`);
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token'); // 假設token存在localStorage中
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }
  searchItineraries(searchForm: any): Observable<ItineraryList[]> {
    return this.http.post<ItineraryList[]>(`${this.apiUrl}/search`, searchForm);
  }

  getRelatedItineraries(activityId: number): Observable<ItineraryList[]> {
    return this.http.get<ItineraryList[]>(`${this.apiUrl}/related/${activityId}`).pipe(
      catchError(error => {
        console.error('獲取相關行程失敗:', error);
        return throwError(() => error);
      })
    );
  }
}
