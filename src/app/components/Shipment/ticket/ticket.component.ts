import { Component, OnInit } from '@angular/core';
import { ShipmentService, Shipment } from '../../../service/Shipment/shipment.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  origins: string[] = ['基隆港', '台中港', '高雄港']; // 靜態出發地列表
  shipments: Shipment[] = [];
  sortedShipments: Shipment[] = [];
  selectedOriginPort: string = '';
  selectedDestinationPort: string = '';
  selectedSortBy: string = 'default';
  isAscending: boolean = true;
  destinations: string[] = []; // 動態目的地選項

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit() {
    this.getShipments(); // 初始化時加載所有資料
  }

  getShipments() {
    // 根據目前篩選和排序條件來獲取資料
    this.shipmentService.getShipments(this.selectedSortBy, this.selectedOriginPort, this.selectedDestinationPort)
      .subscribe(data => {
        this.shipments = data;
        this.sortedShipments = data;
      });
  }

  applyFilter() {
    // 輸出參數以確認正確性
    console.log('Sort:', this.selectedSortBy);
    console.log('Origin Port:', this.selectedOriginPort);
    console.log('Destination Port:', this.selectedDestinationPort);
  
    this.shipmentService.getShipments(this.selectedSortBy, this.selectedOriginPort, this.selectedDestinationPort)
      .subscribe(data => {
        this.shipments = data;
        this.sortedShipments = data;
      });
  }
  
  

  onOriginPortChange() {
    // 當出發地改變時，更新目的地選項
    if (this.selectedOriginPort) {
      this.shipmentService.getShipments('', this.selectedOriginPort, '').subscribe(shipments => {
        const uniqueDestinations = Array.from(new Set(shipments.map(shipment => shipment.destinationPortName)));
        this.destinations = uniqueDestinations;
      });
    } else {
      this.destinations = [];
    }
  }

  onSearch() {
    this.applyFilter(); // 確保查詢按鈕點擊後會更新列表
  }
}
