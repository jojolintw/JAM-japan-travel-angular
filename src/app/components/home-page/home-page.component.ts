import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { ItineraryList } from 'src/app/interface/Product/itinerary-list.interface';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  tours: ItineraryList[] = [
    {
      itinerarySystemId: 1,
      itineraryName: '東京鐵塔浪漫之夜',
      activitySystemId: 1,
      activityName: '高空導覽',
      itineraryDate: ['2024-12-01'],
      imagePath: 'tokyotower.jpg',
      availableDate: '可報名',
      price: 3000,
      areaName: '關東',
      starRate: 5
    },
    {
      itinerarySystemId: 2,
      itineraryName: '沖繩SUP體驗 新手友善',
      activitySystemId: 2,
      activityName: '水上活動',
      itineraryDate: ['2024-12-01'],
      imagePath: 'sup.jpg',
      availableDate: '可報名',
      price: 3500,
      areaName: '沖繩',
      starRate: 4.5
    },
    {
      itinerarySystemId: 3,
      itineraryName: '挑戰日本最高峰',
      activitySystemId: 3,
      activityName: '登山',
      itineraryDate: ['2024-12-01'],
      imagePath: 'fujiyama.jpg',
      availableDate: '可報名',
      price: 6500,
      areaName: '關東',
      starRate: 3.5
    },
    {
      itinerarySystemId: 4,
      itineraryName: '手作烏冬體驗',
      activitySystemId: 4,
      activityName: '美食',
      itineraryDate: ['2024-12-01'],
      imagePath: 'noodle.jpg',
      availableDate: '可報名',
      price: 1500,
      areaName: '關東',
      starRate: 4.5
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
