import { ItineraryService } from '../../../../service/itinerary-service/itinerary.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay, isSameDay, addMonths, subMonths } from 'date-fns';


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
  availableSlots: { date: Date; time: string }[] = [];

  tours: ItineraryDetail[] = [
    {
      id: 1,
      title: '東京鐵塔浪漫之夜',
      travelbrief: '在高空酒吧中，配著小酒享受東京鐵塔浪漫的魅力',
      image: 'tokyotower.jpg',
      date: [
        { date: new Date('2024-10-30'), time: '9:00' },
        { date: new Date('2024-10-30'), time: '12:00' },
        { date: new Date('2024-11-01'), time: '9:00' },
      ],
      stock: 3,
      price: 3000,
    },
    {
      id: 2,
      title: '沖繩SUP體驗 新手友善',
      travelbrief: '',
      image: 'sup.jpg',
      date: [
        { date: new Date('2024-10-30'), time: '9:00' },
        { date: new Date('2024-10-30'), time: '12:00' },
        { date: new Date('2024-11-01'), time: '9:00' },
      ],
      stock: 15,
      price: 3500,
    },
    {
      id: 3,
      title: '挑戰日本最高峰',
      travelbrief: '',
      image: 'fujiyama.jpg',
      date: [
        { date: new Date('2024-10-30'), time: '9:00' },
        { date: new Date('2024-11-30'), time: '12:00' },
        { date: new Date('2024-12-01'), time: '9:00' },
      ],
      stock: 18,
      price: 6500,
    },
    {
      id: 4,
      title: '手作烏冬體驗',
      travelbrief: '',
      image: 'noodle.jpg',
      date: [
        { date: new Date('2024-10-30'), time: '9:00' },
        { date: new Date('2024-12-30'), time: '12:00' },
        { date: new Date('2025-01-01'), time: '9:00' },
      ],
      stock: 20,
      price: 1500,
    },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.itinerary = this.tours.find(tour => tour.id === id)?? null;
        if (this.itinerary) {
          this.itinerary.date.forEach(slot => {
            this.events.push({
              start: slot.date,
              end: slot.date,
              title: slot.time,
              meta: { tourId: this.itinerary?.id }
            });
          });
        }
      } else {
        this.itinerary = null;
      }
    });

    this.tours.forEach(tour => {
      tour.date.forEach(slot => {
        this.events.push({
          start: slot.date,
          end: slot.date,
          title: slot.time,
          meta: { tourId: tour.id }
        });
      });
    });
  }
  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  onDayClicked(day: CalendarMonthViewDay): void {
    this.selectedDay = day;
    this.availableSlots = this.tours
     .flatMap(tour => tour.date)
     .filter(slot => isSameDay(slot.date, day.date));
  }

}
