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
  selectedDeparture: string | null = null;
  selectedDestination: string | null = null;

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    // 傳入目前選擇的排序選項、出發地和目的地作為參數
    this.shipmentService.getShipments(this.selectedSortOption, this.selectedDeparture || '', this.selectedDestination || '').subscribe(
      shipments => {
        this.shipments = shipments;
        this.applySortingAndFiltering(); // 如需進一步排序或篩選
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

  onDepartureChange(departure: string): void {
    this.selectedDeparture = departure;
    this.applySortingAndFiltering();
  }

  onDestinationChange(destination: string): void {
    this.selectedDestination = destination;
    this.applySortingAndFiltering();
  }

  applySortingAndFiltering(): void {
    this.sortedShipments = [...this.shipments]; // 複製原始資料

    // 篩選處理
    if (this.selectedDeparture) {
      this.sortedShipments = this.sortedShipments.filter(shipment => shipment.originPortName === this.selectedDeparture);
    }

    if (this.selectedDestination) {
      this.sortedShipments = this.sortedShipments.filter(shipment => shipment.destinationPortName === this.selectedDestination);
    }

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
        // 這裡省略
        break;
      default:
        // 默認排序
        break;
    }
  }
}
