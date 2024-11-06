import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay, isSameDay, addMonths, subMonths } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { TimeSelectionDialogComponent } from '../timeselectiondialog/timeselectiondialog.component';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { cartItem } from 'src/app/interface/Order/cartItem';


@Component({
  selector: 'app-itinerary-detail',
  templateUrl: './itinerary-detail.component.html',
  styleUrls: ['./itinerary-detail.component.css'],
})


export class ItineraryDetailComponent implements OnInit {

  itinerary: ItineraryDetail | null = null;
  tours: ItineraryDetail[] = [];
  relatedTours: Itinerary[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedDay: CalendarMonthViewDay | null = null;
  dayStatus: { [key: string]: { hasStock: boolean, times: string[] } } = {};
  availableSlots: { date: Date; time: string }[] = [];
  quantity: number = 1;
  cartItems: cartItem[] = [];
  // newItem: cartItem = { // 測試用
  //   id: 6,              // 商品 ID
  //   name: '商品F',      // 商品名稱
  //   price: 777,         // 商品價格
  //   quantity: 1,        // 初始數量
  //   imagePath:'',       // 圖片路徑
  // }

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private itineraryService: ItineraryService, private localstorageService: LocalstorageService) { }

  loadItineraryDetail(id: number): void {
    this.itineraryService.getItineraryById(id).subscribe(response => {
      this.itinerary = response;
      if (this.itinerary && this.itinerary.activityId!== 0 && this.itinerary.activityId!== undefined) {
        this.loadRelatedItineraries(this.itinerary.activityId);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.loadItineraryDetail(id);
      }
    });
  }

  // loadItineraryDetail(id: number): void {
  //   this.itineraryService.getItineraryById(id).subscribe({
  //     next: (data) => {
  //       this.itinerary = data;
  //       this.tours = [data];

  //       if (this.itinerary) {
  //         this.events = this.itinerary.itineraryDate.map(dateTimeStr => ({
  //           start: new Date(dateTimeStr),
  //           title: dateTimeStr.split(' ')[1],
  //           meta: { tourId: this.itinerary?.itinerarySystemId }
  //         }));
  //         this.loadRelatedItineraries(this.itinerary.activityId);
  //       }

  //       this.initializeDayStatus();
  //     },
  //     error: (error) => {
  //       console.error('加載行程詳情失敗:', error);
  //       // 這裡可以添加錯誤處理邏輯
  //     }
  //   });
  // }

  initializeDayStatus(): void {
    this.tours.forEach(tour => {
      tour.itineraryDate.forEach(dateTimeStr => {
        const dateStr = dateTimeStr.split(' ')[0];
        const timeStr = dateTimeStr.split(' ')[1];

        if (!this.dayStatus[dateStr]) {
          this.dayStatus[dateStr] = {
            hasStock: tour.stock > 0,
            times: []
          };
        }
        if (!this.dayStatus[dateStr].times.includes(timeStr)) {
          this.dayStatus[dateStr].times.push(timeStr);
        }
      });
    });
  }

  loadRelatedItineraries(activityId: number): void {
    this.itineraryService.getRelatedItineraries(activityId).subscribe({
      next: (data) => {
        console.log('activityId:', activityId);
        console.log('相關行程資料:', data);
        // 過濾掉當前行程，只顯示其他相關行程
        this.relatedTours = data
          .filter(item => item.itinerarySystemId !== this.itinerary?.itinerarySystemId)
      },
      error: (error) => {
        console.error('加載相關行程失敗:', error);
      }
    });
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  hasStockInfo(day: CalendarMonthViewDay): boolean {
    const dateStr = day.date.toISOString().split('T')[0];
    return !!this.dayStatus[dateStr];
  }

  getStockStatus(day: CalendarMonthViewDay): string {
    const dateStr = day.date.toISOString().split('T')[0];
    return this.dayStatus[dateStr]?.hasStock ? 'O' : 'X';
  }

  onDayClicked(day: CalendarMonthViewDay): void {
    const dateStr = day.date.toISOString().split('T')[0];
    const availableTimes = this.dayStatus[dateStr]?.times || [];

    this.dialog.open(TimeSelectionDialogComponent, {
      data: {
        DepartureDate: dateStr,
        times: availableTimes,
        tours: this.tours.map(tour => ({
          ItineraryDate: tour.itineraryDate,
          stock: tour.stock
        }))
      },
      width: '300px'
    });
  }
  decreaseQuantity(): void {
    this.quantity = Math.max(this.quantity - 1, 1);
  }

  // Method to increase the quantity
  increaseQuantity(): void {
    this.quantity = Math.min(this.quantity + 1, 100);
  }

  // Method to update the quantity manually
  updateQuantity(value: string): void {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      this.quantity = Math.max(Math.min(numericValue, 100), 1);
    } else {
      this.quantity = 1;
    }
  }

  // 加入購物車
  addToCart():void {
    const newCartItem:cartItem={
      ItineraryDateSystemId:1,  //暫先用1代替，待ItineraryDateSystemId建立
      ItinerarySystemId:this.itinerary?.itinerarySystemId as number,
      name:this.itinerary?.itineraryName as string,
      price:this.itinerary?.price as number,
      quantity:this.quantity,
      imagePath:this.itinerary?.imageName as string
    }

    this.localstorageService.addToCart(newCartItem);
  }
}
