import { Component, OnInit } from '@angular/core';
import { ShipmentService, Shipment } from '../../../service/Shipment/shipment.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  shipments: Shipment[] = [];
  sortedShipments: Shipment[] = [];
  selectedSortOption: string = 'default';

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentService.getShipments().subscribe(
      shipments => {
        this.shipments = shipments;
        this.applySortingAndFiltering();
      },
      error => {
        console.error('Error loading shipments:', error);
      }
    );
  }

  onSortChange(sortOption: string): void {
    this.selectedSortOption = sortOption;
    this.applySortingAndFiltering();
  }

  applySortingAndFiltering(): void {
    this.sortedShipments = [...this.shipments]; // 複製原始資料

    // 排序處理
    switch (this.selectedSortOption) {
      case 'priceAsc':
        this.sortedShipments.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.sortedShipments.sort((a, b) => b.price - a.price);
        break;
      case 'date':
        // 按出發時間排序，將未來最近的時間排在最前面
        // this.sortedShipments.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
        break;
      default:
        // 默認排序
        break;
    }
  }
}
