import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerary } from '../interface/itinerary.interface';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private apiUrl = 'https://your-api-url.com/tours'; // 替换为你的实际 API 地址

  constructor(private http: HttpClient) { }

  getToursByRegion(region: number): Observable<any> {
    return this.http.get<Itinerary[]>(`${this.apiUrl}?region=${region}`);
  }

  getTourById(id: number): Observable<any> {
    return this.http.get<Itinerary>(`${this.apiUrl}/${id}`);
  }
}
