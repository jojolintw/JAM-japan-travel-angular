// detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService,ShipmentDetail } from '../../../service/Shipment/shipment.service';
import { ScheduleService,Schedule  } from '../../../service/Shipment/schedule.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  shipmentDetail: ShipmentDetail | undefined;
  schedules: Schedule[] = [];
  selectedScheduleId: number | null = null;

   constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    private scheduleService: ScheduleService,
    
  ) {}

  ngOnInit(): void {
    const routeId = Number(this.route.snapshot.paramMap.get('routeId'));
    if (!isNaN(routeId)) {
      this.getShipmentDetail(routeId);
      this.getSchedules(routeId);
    }
  }

  getShipmentDetail(routeId: number): void {
    this.shipmentService.getShipmentDetail(routeId).subscribe({
      next: (data) => this.shipmentDetail = data,
      error: (err) => console.error('Error fetching shipment details:', err)
    });
  }

  getSchedules(routeId: number): void {
    this.scheduleService.getSchedulesByRouteId(routeId).subscribe({
      next: (data) => this.schedules = data,
      error: (err) => console.error('Error fetching schedules:', err)
    });
  }

  onScheduleSelected(scheduleId: number): void {
    this.selectedScheduleId = scheduleId;
    // 進入下一頁或進行其他操作，例如跳轉到詳細內容頁面
    // this.router.navigate(['/schedule', scheduleId]); // 示例路由
  }

  
}
