import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';
import { ItineraryService } from 'src/service/itinerary-service/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
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
    },
    {
      id: 7,
      title: '沖繩SUP體驗 新手友善',
      image: 'sup.jpg',
      stock: 3
    },
    {
      id: 8,
      title: '東京鐵塔浪漫之夜',
      image: 'tokyotower.jpg',
      stock: 15
    },
    {
      id: 9,
      title: '手作烏冬體驗',
      image: 'noodle.jpg',
      stock: 18
    },
    {
      id: 10,
      title: '挑戰日本最高峰',
      image: 'fujiyama.jpg',
      stock: 20
    },
    {
      id: 11,
      title: '沖繩包船海釣 船上海鮮吃到飽',
      image: 'fishing.jpg',
      stock: 30
    },
    {
      id: 12,
      title: '大人小孩的天堂 VIP遊園',
      image: 'TokyoDisney.jpg',
      stock: 5
    }

  ];
  region: number | null = null;
  totalItems: number = this.tours.length; // 总条目数
  itemsPerPage: number = 6; // 每页显示的条目数
  currentPage: number = 1; // 当前页码
  displayedTours: Itinerary[] = []; // 当前显示的数据

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
          this.totalItems = this.tours.length;
          this.paginate();
        });
      } else {
        // 处理 null 或 undefined 的情况
        this.region = 0; // 或设置一个默认值
        this.totalItems = this.tours.length;
        this.paginate();
      }
    });

  }
  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedTours = this.tours.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  onNext(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.paginate();
    }
  }

  get pages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

}
