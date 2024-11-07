// detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService,ShipmentDetail } from '../../../service/Shipment/shipment.service';
import { ScheduleService,Schedule  } from '../../../service/Shipment/schedule.service';
import { Cart2Service } from '../../../service/Shipment/cart2.service'; // 引入CartService
import { Router } from '@angular/router';

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
  showDetailModal: boolean = false; // 控制彈出視窗的顯示
  showDetailPanel: boolean = false;
  item: any = { name: '商品名稱', price: 100 }; // 假設的商品數據
  

   constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    private scheduleService: ScheduleService,
    private cart2Service: Cart2Service, 
    private router: Router
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
    this.showDetailPanel = true; // 打開側邊視窗
  }

  closePanel(): void {
    this.showDetailPanel = false; // 關閉側邊視窗
  }

  // addToCart(): void {
  //   if (this.selectedScheduleId) {
  //     // 假設加入購物車的邏輯，例如保存到本地存儲或發送請求
  //     const selectedSchedule = this.schedules.find(s => s.scheduleId === this.selectedScheduleId);
  //     console.log('加入購物車:', {
  //       scheduleId: selectedSchedule?.scheduleId,
  //       seats: this.selectedSeats
  //     });
  //     alert(`成功將 ${this.selectedSeats} 人的航班加入購物車！`);
  //   } else {
  //     alert("請選擇出發日期和人數！");
  //   }
  // }
  addToCart() {
    const selectedSchedule = this.schedules.find(schedule => schedule.scheduleId === this.selectedScheduleId);
    if (selectedSchedule) {
      // 將所選行程和人數儲存到 Cart2Service
      this.cart2Service.setSelectedSchedule(selectedSchedule);
      this.cart2Service.setSelectedSeats(this.selectedSeats);

      // 跳轉到 cart2 頁面
      this.router.navigate(['/cart2']);
    }
  }  
}
