// schedule.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Schedule {
  scheduleId: number;
  departureTime: Date;
}
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'https://localhost:7100/api/Shipment';

  constructor(private http: HttpClient) {}

  getSchedulesByRouteId(routeId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/${routeId}/schedules`);
  }
}
