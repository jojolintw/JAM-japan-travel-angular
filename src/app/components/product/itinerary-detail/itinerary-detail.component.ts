import { ItineraryService } from '../../../service/Itinerary/itinerary.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay, isSameDay, addMonths, subMonths } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { TimeSelectionDialogComponent } from '../timeselectiondialog/timeselectiondialog.component';


@Component({
  selector: 'app-itinerary-detail',
  templateUrl: './itinerary-detail.component.html',
  styleUrls: ['./itinerary-detail.component.css'],
})


export class ItineraryDetailComponent implements OnInit {

  itinerary: ItineraryDetail | null = null;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  selectedDay: CalendarMonthViewDay | null = null;
  dayStatus: { [key: string]: { hasStock: boolean, times: string[] } } = {};
  availableSlots: { date: Date; time: string }[] = [];
  availableTimes = ['09:00', '11:30', '15:00'];

  tours: ItineraryDetail[] = [
    // {
    //   ItinerarySystemId: 1,
    //   ItineraryName: '東京鐵塔浪漫之夜',
    //   AreaName: '東京',
    //   ImageName: 'tokyotower.jpg',
    //   DepartureDate:[
    //     '2024-10-30 9:00',
    //     '2024-10-30 12:00',
    //     '2024-10-30 15:00',
    //   ],
    //   Stock: 3,
    //   Price: 3000,
    //   ItineraryDetail: '',
    //   ItineraryBrief: '',
    //   ItineraryNotes: '',
    // },
    // {
    //   ItinerarySystemId: 2,
    //   ItineraryName: '沖繩SUP體驗 新手友善',
    //   AreaName: '沖繩',
    //   ImageName: 'sup.jpg',
    //   DepartureDate: [
    //       '2024-10-30 9:00',
    //       '2024-10-30 12:00',
    //       '2024-10-30 15:00',
    //   ],
    //   Stock: 15,
    //   Price: 3500,
    //   ItineraryDetail: '',
    //   ItineraryBrief: '',
    //   ItineraryNotes: '',
    // },
    // {
    //   ItinerarySystemId: 3,
    //   ItineraryName: '挑戰日本最高峰',
    //   AreaName: '富士山',
    //   ImageName: 'fujiyama.jpg',
    //   DepartureDate:[
    //     '2024-10-30 9:00',
    //     '2024-10-30 12:00',
    //     '2024-10-30 15:00',
    //   ],
    //   Stock: 18,
    //   Price: 6500,
    //   ItineraryDetail: '',
    //   ItineraryBrief: '',
    //   ItineraryNotes: '',
    // },
    // {
    //   ItinerarySystemId: 4,
    //   ItineraryName: '手作烏冬體驗',
    //   AreaName: '沖繩',
    //   ImageName: 'noodle.jpg',
    //   DepartureDate: [
    //     '2024-10-30 9:00',
    //     '2024-10-30 12:00',
    //     '2024-10-30 15:00',
    //   ],
    //   Stock: 20,
    //   Price: 1500,
    //   ItineraryDetail: '',
    //   ItineraryBrief: '',
    //   ItineraryNotes: '',
    // },
  ];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.itinerary = this.tours.find(tour => tour.itinerarySystemId === id) ?? null;
        if (this.itinerary) {
          this.itinerary.itineraryDate.forEach(dateTimeStr => {
            this.events.push({
              start: new Date(dateTimeStr),
              title: dateTimeStr.split(' ')[1],
              meta: { tourId: this.itinerary?.itinerarySystemId }
            });
          });
        }
      }
    });
    this.initializeDayStatus();
  }

  private initializeDayStatus(): void {
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

}
