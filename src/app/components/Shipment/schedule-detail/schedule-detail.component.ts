import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ScheduleService, Schedule } from '../../../service/Shipment/schedule.service';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css']
})
export class ScheduleDetailComponent implements OnInit, OnChanges {
  @Input() scheduleId!: number;
  @Output() close = new EventEmitter<void>(); // 傳遞關閉事件給父組件
  @Output() scheduleData = new EventEmitter<{ capacity: number; seats: number }>(); // 傳遞座位數據給父組件

  schedule: Schedule | undefined;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.loadSchedule();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scheduleId'] && !changes['scheduleId'].firstChange) {
      this.loadSchedule(); // 當 scheduleId 變更時，重新加載資料
    }
  }

  loadSchedule(): void {
    if (this.scheduleId) {
      this.scheduleService.getScheduleById(this.scheduleId).subscribe({
        next: (data) => {
          this.schedule = data;
          if (this.schedule) {
            // 將 capacity 和 seats 傳遞給父組件
            this.scheduleData.emit({
              capacity: this.schedule.capacity,
              seats: this.schedule.seats
            });
          }
        },
        error: (err) => console.error('Error fetching schedule details:', err)
      });
    }
  }

  closePanel(): void {
    this.close.emit(); // 通知父組件關閉視窗
  }
}
