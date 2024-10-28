import { ItineraryService } from '../../../../service/itinerary-service/itinerary.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryDetail } from 'src/app/interface/Product/itinerary-detail.interface';


@Component({
  selector: 'app-itinerary-detail',
  templateUrl: './itinerary-detail.component.html',
  styleUrls: ['./itinerary-detail.component.css']
})


export class ItineraryDetailComponent implements OnInit {



  itinerary: ItineraryDetail | null = null;
  date: Date | null = null;

  tours: ItineraryDetail[] = [
    {
      id: 1,
      title: '東京鐵塔浪漫之夜',
      travelbrief: '在高空酒吧中，配著小酒享受東京鐵塔浪漫的魅力',
      image: 'tokyotower.jpg',
      stock: 3,
      price: 3000,
    },
    {
      id: 2,
      title: '沖繩SUP體驗 新手友善',
      travelbrief: '',
      image: 'sup.jpg',
      stock: 15,
      price: 3500,
    },
    {
      id: 3,
      title: '挑戰日本最高峰',
      travelbrief: '',
      image: 'fujiyama.jpg',
      stock: 18,
      price: 6500,
    },
    {
      id: 4,
      title: '手作烏冬體驗',
      travelbrief: '',
      image: 'noodle.jpg',
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
        this.itinerary = this.tours.find(tour => tour.id === id)?? this.itinerary;
      } else {
        this.itinerary = null; // 确保在没有ID的情况下设置为null
      }
    });
  }




}
