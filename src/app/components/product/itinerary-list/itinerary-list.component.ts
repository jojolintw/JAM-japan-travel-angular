import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { ItineraryService } from 'src/app/itinerary-service/itinerary.service';
import { Itinerary } from 'src/app/interface/itinerary.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})

export class ItineraryListComponent implements OnInit {
  tours: Itinerary[] = [
    {
      id: 1,
      title: '東京鐵塔浪漫之夜',
      image: 'tokyotower.jpg',
      stock: 3
    },
    {
      id: 2,
      title: '沖繩SUP體驗 新手友善',
      image: 'sup.jpg',
      stock: 15
    },
    {
      id: 3,
      title: '挑戰日本最高峰',
      image: 'fujiyama.jpg',
      stock: 18
    },
    {
      id: 4,
      title: '手作烏冬體驗',
      image: 'noodle.jpg',
      stock: 20
    },
    {
      id: 5,
      title: '大人小孩的天堂 VIP遊園',
      image: 'TokyoDisney.jpg',
      stock: 30
    },
    {
      id: 6,
      title: '沖繩包船海釣 船上海鮮吃到飽',
      image: 'fishing.jpg',
      stock: 5
    }

  ];
  region: number | null = null;

  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    // 加载样式文件
    this.route.params.subscribe((params) => {
      const regionParam = params['region'];
      if (regionParam) {
        this.region = parseInt(regionParam.replace('area_', ''), 10);
        // 根据 region 加载相应的数据或显示内容
        this.itineraryService.getToursByRegion(this.region).subscribe((data: Itinerary[]) => {
          this.tours = data;
        });
      } else {
        // 处理 null 或 undefined 的情况
        this.region = 0; // 或设置一个默认值
      }
    });
  }


}
