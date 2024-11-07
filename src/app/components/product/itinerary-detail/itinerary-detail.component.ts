import { LocalstorageService } from 'src/app/service/Order/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay, isSameDay, addMonths, subMonths } from 'date-fns';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { cartItem } from 'src/app/interface/Order/cartItem';



@Component({
  selector: 'app-itinerary-detail',
  templateUrl: './itinerary-detail.component.html',
  styleUrls: ['./itinerary-detail.component.css'],
})


export class ItineraryDetailComponent implements OnInit {

  itineraryDetail: ItineraryDetail | null = null;
  tours: ItineraryDetail[] = [];
  relatedTours: Itinerary[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedDay: CalendarMonthViewDay | null = null;
  dayStatus: { [key: string]: { dateSystemId: number; times: string[]; stock: number }} = {};
  availableSlots: { date: Date; time: string }[] = [];
  selectedDate: string | null = null;
  selectedDateTimes: string[] = [];
  quantity: number = 1;
  cartItems: cartItem[]=[];



  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService, private localStorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.loadItineraryDetail(id);
      }
    });
  }

  loadItineraryDetail(id: number): void {
    this.itineraryService.getItineraryById(id).subscribe(response => {
      this.itineraryDetail = response;
      console.log(this.itineraryDetail);
      this.loadRelatedItineraries(this.itineraryDetail.activityId);
      if (this.itineraryDetail) {
        // 将后端返回的日期时间转换为日历事件
        this.events = [];

      // 使用 for...of 循环处理日期
      // for (const dateTimeStr of this.itineraryDetail.itineraryDate) {
      //   const event: CalendarEvent = {
      //     start: new Date(dateTimeStr),
      //     title: new Date(dateTimeStr).toLocaleTimeString('zh-TW', {
      //       hour: '2-digit',
      //       minute: '2-digit'
      //     }),
      //     meta: {
      //       dateSystemId: this.itineraryDetail.itineraryDateSystemId,
      //       hasEvent: true
      //     }
      //   };
      //   this.events.push(event);
      // }

        this.initializeDayStatus();
      }
    });
  }

  initializeDayStatus(): void {
    if (!this.itineraryDetail) return;

    this.dayStatus = {};
    this.events = [];

    // 遍歷所有日期系統
  this.itineraryDetail.dateSystem.forEach(dateSystem => {
    if (!dateSystem.itineraryDate) return;

    dateSystem.itineraryDate.forEach(dateTimeStr => {
      const dateStr = dateTimeStr.split('T')[0];
      const timeStr = new Date(dateTimeStr).toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // 初始化该日期的状态
      if (!this.dayStatus[dateStr]) {
        this.dayStatus[dateStr] = {
          dateSystemId: dateSystem.itineraryDateSystemId,
          times: [],
          stock: dateSystem.stock || 0
        };
      }

      // 添加时间到数组中
      if (!this.dayStatus[dateStr].times.includes(timeStr)) {
        this.dayStatus[dateStr].times.push(timeStr);
      }

      // 添加日历事件
      const event: CalendarEvent = {
        start: new Date(dateTimeStr),
        title: timeStr,
        meta: {
          dateSystemId: dateSystem.itineraryDateSystemId,
          hasEvent: true,
          hasStock: dateSystem.stock > 0  // 使用 dateSystem 的 stock
        }
      };
      this.events.push(event);
    });
  });
  }

  loadRelatedItineraries(activityId: number): void {
    this.itineraryService.getRelatedItineraries(activityId).subscribe({
      next: (data) => {
        this.relatedTours = data
          .filter(item => item.itinerarySystemId !== this.itineraryDetail?.itinerarySystemId)
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

  hasAvailableStock(day: CalendarMonthViewDay): boolean {
    const dateStr = day.date.toISOString().split('T')[0];
    return this.dayStatus[dateStr]?.stock > 0 || false;
  }

  // 檢查特定時間是否有庫存
  hasTimeSlotStock(time: string): boolean {
    if (!this.selectedDate) return false;
    return (this.dayStatus[this.selectedDate]?.stock || 0) > 0;
  }

  onDayClicked(day: CalendarMonthViewDay): void {
    const dateStr = day.date.toISOString().split('T')[0];
    if (this.hasAvailableStock(day)) {
      if (this.selectedDate === dateStr) {
        // 如果點擊已選中的日期，則取消選擇
        this.selectedDate = null;
        this.selectedDateTimes = [];
      } else {
        // 選擇新日期並獲取對應時間
        this.selectedDate = dateStr;
        this.selectedDateTimes = this.dayStatus[dateStr]?.times.map(t => t)  || [];
      }
    }
  }

  selectDateTime(time: string): void {
    if (!this.selectedDate) {
      console.log('請先選擇日期');
      return;
    }

    const dayStatusForDate = this.dayStatus[this.selectedDate];
    if (!dayStatusForDate) {
      console.log('無效的日期選擇');
      return;
    }

    if (dayStatusForDate.stock <= 0) {
      console.log('此時段已無庫存');
      return;
    }

    if (!dayStatusForDate.times.includes(time)) {
      console.log('無效的時間段');
      return;
    }

    const formattedDateTime = this.formatDateTime(this.selectedDate, time);
    console.log('Selected datetime:', formattedDateTime);
    console.log('DateSystemId:', dayStatusForDate.dateSystemId);
  }

  formatDateTime(date: string, time: string): string {
    return `${date}T${time}`;
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

 //加入購物車
 addToCart():void{
  const newCartItem:cartItem={
    itineraryDateSystemId:1,
    ItinerarySystemId:this.itineraryDetail?.itinerarySystemId as number,
    name:this.itineraryDetail?.itineraryName as string,
    price:this.itineraryDetail?.price as number,
    quantity:this.quantity,
    imagePath:this.itineraryDetail?.imageName as string
  }
  this.localStorageService.addToCart(newCartItem);
 }

}
