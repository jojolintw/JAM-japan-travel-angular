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
      id: 1,
      title: '東京鐵塔浪漫之夜',
      image: 'tokyotower.jpg',
      stock: 3,
      price: 3000,
    },
    {
      id: 2,
      title: '沖繩SUP體驗 新手友善',
      image: 'sup.jpg',
      stock: 15,
      price: 3500,
    },
    {
      id: 3,
      title: '挑戰日本最高峰',
      image: 'fujiyama.jpg',
      stock: 18,
      price: 6500,
    },
    {
      id: 4,
      title: '手作烏冬體驗',
      image: 'noodle.jpg',
      stock: 20,
      price: 1500,
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
