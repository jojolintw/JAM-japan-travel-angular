import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  tours: Itinerary[] = [
    {
      itinerarySystemId: 1,
      itineraryName: '東京鐵塔浪漫之夜',
      activityId: 1,
      itineraryDate: ['2024-12-01'],
      imagePath: 'tokyotower.jpg',
      stock: 3,
      price: 3000,
      areaName: '關東',
    },
    {
      itinerarySystemId: 2,
      itineraryName: '沖繩SUP體驗 新手友善',
      activityId: 2,
      itineraryDate: ['2024-12-01'],
      imagePath: 'sup.jpg',
      stock: 15,
      price: 3500,
      areaName: '沖繩',
    },
    {
      itinerarySystemId: 3,
      itineraryName: '挑戰日本最高峰',
      activityId: 3,
      itineraryDate: ['2024-12-01'],
      imagePath: 'fujiyama.jpg',
      stock: 18,
      price: 6500,
      areaName: '關東',
    },
    {
      itinerarySystemId: 4,
      itineraryName: '手作烏冬體驗',
      activityId: 4,
      itineraryDate: ['2024-12-01'],
      imagePath: 'noodle.jpg',
      stock: 20,
      price: 1500,
      areaName: '關東',
    }
  ];
  slideConfig = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear',
    adaptiveHeight: true
  };
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
  }

}
