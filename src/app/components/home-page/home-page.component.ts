import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from 'src/service/itinerary-service/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  tour: Itinerary[] = [
    {
      ItinerarySystemId: 1,
      ItineraryName: '東京鐵塔浪漫之夜',
      ImageName: 'tokyotower.jpg',
      Stock: 3,
      Price: 3000,
      AreaName: '關東',
    },
    {
      ItinerarySystemId: 2,
      ItineraryName: '沖繩SUP體驗 新手友善',
      ImageName: 'sup.jpg',
      Stock: 15,
      Price: 3500,
      AreaName: '沖繩',
    },
    {
      ItinerarySystemId: 3,
      ItineraryName: '挑戰日本最高峰',
      ImageName: 'fujiyama.jpg',
      Stock: 18,
      Price: 6500,
      AreaName: '關東',
    },
    {
      ItinerarySystemId: 4,
      ItineraryName: '手作烏冬體驗',
      ImageName: 'noodle.jpg',
      Stock: 20,
      Price: 1500,
      AreaName: '關東',
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
