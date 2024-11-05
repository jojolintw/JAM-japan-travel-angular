// detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService,ShipmentDetail } from '../../../service/Shipment/shipment.service';// 根據實際路徑更改


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  shipmentDetail: ShipmentDetail | undefined;

  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    const routeId = Number(this.route.snapshot.paramMap.get('routeId')); // 將 routeId 轉為數字
    if (!isNaN(routeId)) {
      this.getShipmentDetail(routeId);
    } else {
      console.error('Invalid routeId');
    }
  }

  getShipmentDetail(routeId: number): void {
    this.shipmentService.getShipmentDetail(routeId).subscribe({
      next: (data) => this.shipmentDetail = data,
      error: (err) => console.error('Error fetching shipment details:', err)
    });
  }
}
