import { Component, OnInit } from '@angular/core';
import { ShipmentService, Shipment } from '../../../service/Shipment/shipment.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  shipments: Shipment[] = [];

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentService.getShipments().subscribe(
      shipments => {
        this.shipments = shipments; // 更新組件的 shipments 數據
      },
      error => {
        console.error('Error loading shipments:', error);
      }
    );
  }
}
