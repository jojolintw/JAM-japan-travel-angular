import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService, ShipmentDetail } from '../../../service/Shipment/shipment.service';
import { ScheduleService, Schedule } from '../../../service/Shipment/schedule.service';
import { Cart2Service } from '../../../service/Shipment/cart2.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';



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
  showDetailModal: boolean = false;
  showDetailPanel: boolean = false;
  item: any = { name: '商品名稱', price: 100 };
  
  // 新增的屬性來存儲圖片
  coverImageUrl: string = ''; // 封面圖片
  portImages: any[] = []; // 剩餘圖片

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
      this.loadPortImages(routeId); // 新增：根據 RouteId 加載圖片
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
        this.schedules = data.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
      },
      error: (err) => console.error('Error fetching schedules:', err)
    });
  }

  loadPortImages(portId: number): void {
    this.shipmentService.getPortImages(portId).subscribe({
      next: (images) => {
        // 如果沒有圖片，使用預設封面圖
        if (images.length === 0) {
          this.coverImageUrl = 'https://localhost:7100/images/Shipment/Port/defaultPort.jpg';
          this.portImages = [{ portImageUrl: this.coverImageUrl, portImageDescription: '預設封面圖' }];
        } else {
          this.coverImageUrl = images[0].portImageUrl; // 將第一張設為封面圖
          this.portImages = [{ portImageUrl: this.coverImageUrl, portImageDescription: images[0].portImageDescription }, ...images.slice(1)];
        }
        console.log('Port images loaded:', this.portImages);
      },
      error: (err) => console.error('Error fetching port images:', err)
    });
}

  
  
  loadPortImagesByDestinationPort(): void {
    const destinationPort = this.shipmentDetail?.destinationPortName;
    if (destinationPort) {
      this.shipmentService.getPortIdByDestinationPort(destinationPort).subscribe({
        next: (portId) => {
          if (portId) {
            // 使用 PortId 加载图片
            this.shipmentService.getPortImages(portId).subscribe({
              next: (images) => {
                this.portImages = images.map(img => ({
                  ...img,
                  portImageUrl: img.portImageUrl
                    ? `https://localhost:7100${img.portImageUrl}`
                    : 'assets/img/Shipment/19.jpg' // 使用默认图片
                }));
                console.log('Port images loaded:', this.portImages);

                if (this.portImages.length > 0) {
                  this.coverImageUrl = this.portImages[0].portImageUrl;
                  this.portImages = this.portImages.slice(1);
                }
              },
              error: (err) => console.error('Error fetching port images:', err)
            });
          }
        },
        error: (err) => console.error('Error fetching PortId:', err)
      });
    }
  }
  
  setActiveSlide(index: number): void {
    const carousel = document.getElementById('portImagesCarousel');
    if (carousel) {
      const bsCarousel = new bootstrap.Carousel(carousel);
      bsCarousel.to(index); // 切換到指定的圖片索引
    }
  }


  onScheduleSelected(scheduleId: number): void {
    this.selectedScheduleId = scheduleId;
    this.showDetailPanel = true;
  }

  closePanel(): void {
    this.showDetailPanel = false;
  }

  addToCart() {
    const selectedSchedule = this.schedules.find(schedule => schedule.scheduleId === this.selectedScheduleId);
    if (selectedSchedule && this.shipmentDetail) {
      const scheduleWithPrice = { ...selectedSchedule, price: this.shipmentDetail.price };
      this.cart2Service.setSelectedSchedule(scheduleWithPrice);
      this.cart2Service.setSelectedSeats(this.selectedSeats);
      this.router.navigate(['/cart2']);
    }
  }
}
