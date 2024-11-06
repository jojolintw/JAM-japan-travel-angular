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
  selectedSeats: number = 1;

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
      next: (data) => {
        // 按出發日期排序
        this.schedules = data.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
      },
      error: (err) => console.error('Error fetching schedules:', err)
    });
  }

  onScheduleSelected(scheduleId: number): void {
    this.selectedScheduleId = scheduleId;
    // 進入下一頁或進行其他操作，例如跳轉到詳細內容頁面
    // this.router.navigate(['/schedule', scheduleId]); // 示例路由
  }
  addToCart(): void {
    if (this.selectedScheduleId) {
      // 假設加入購物車的邏輯，例如保存到本地存儲或發送請求
      const selectedSchedule = this.schedules.find(s => s.scheduleId === this.selectedScheduleId);
      console.log('加入購物車:', {
        scheduleId: selectedSchedule?.scheduleId,
        seats: this.selectedSeats
      });
      alert(`成功將 ${this.selectedSeats} 人的航班加入購物車！`);
    } else {
      alert("請選擇出發日期和人數！");
    }
  }
  
}
