import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerary } from '../../app/interface/Product/itinerary.interface';


@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private apiUrl = 'https://localhost:7217/api/ProductAPI';  // 請確認這是您的後端API正確的端口號

  constructor(private http: HttpClient) { }


  getItinerariesByRegion(region: number): Observable<any> {
    return this.http.get<Itinerary[]>(`${this.apiUrl}?region=${region}`);
  }

  getItineraryById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getItineraries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  createItinerary(itinerary: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, itinerary);
  }

  deleteItinerary(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateItinerary(id: number, itinerary: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, itinerary);
  }
}
