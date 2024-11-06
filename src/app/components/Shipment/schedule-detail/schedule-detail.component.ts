import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService,Schedule } from '../../../service/Shipment/schedule.service';



@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit {
  schedule: Schedule | undefined;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    const scheduleId = Number(this.route.snapshot.paramMap.get('scheduleId'));
    if (!isNaN(scheduleId)) {
      this.getScheduleDetail(scheduleId);
    }
  }

  getScheduleDetail(scheduleId: number): void {
    this.scheduleService.getScheduleById(scheduleId).subscribe({
      next: (data) => this.schedule = data,
      error: (err) => console.error('Error fetching schedule details:', err)
    });
  }
}
