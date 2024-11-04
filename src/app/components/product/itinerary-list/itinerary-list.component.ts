import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { ActivityName } from 'src/app/interface/Product/Activities';




@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})

export class ItineraryListComponent implements OnInit {
  activityNames: ActivityName[] = [];
  tours: Itinerary[] = [];
  allTours: Itinerary[] = [];
  region: number | null = null;
  itemsPerPage: number = 6; // 每页显示的条目数
  currentPage: number = 1; // 当前页码\
  pages: number[] = [];
  searchForm = {
    name: '',
    location: '',
    month: '',
    activityId: '',
    sortBy: 'popular'
  };



  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this.loadActivityNames();
    this.loadAllItineraries();
    // this.route.params.subscribe((params) => {
    //   const regionParam = params['region'];
    //   if (regionParam) {
    //     this.region = parseInt(regionParam.replace('area_', ''), 10);
    //     this.loadItinerariesByRegion(this.region);
    //   }
    // });
  }

  loadActivityNames(): void {
    this.itineraryService.getActivityNames()
      .subscribe({
        next: (data) => {
          this.activityNames = data;
        },
        error: (error) => {
          console.error('獲取活動名稱失敗:', error);
        }
      });
  }

  loadAllItineraries(): void {
    this.itineraryService.getItineraries().subscribe({
      next: (data) => {
        this.tours = data;
        this.allTours = [...data]; // 保存原始數據的副本
        this.calculatePages();
        console.log(this.tours);
        console.log(this.allTours);
      },
      error: (error) => {
        console.error('讀取失敗請重新整理:', error);
      }
    });
  }

  loadItinerariesByRegion(region: number): void {
    this.itineraryService.getItinerariesByRegion(region).subscribe({
      next: (data) => {
        this.tours = data;
        this.calculatePages();
      },
      error: (error) => {
        console.error('讀取失敗請重新整理:', error);
      }
    });
  }

  calculatePages() {
    const pageCount = Math.ceil(this.tours.length / this.itemsPerPage);
    this.pages = Array.from({length: pageCount}, (_, i) => i + 1);
  }

  get paginatedTours() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.tours.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNext() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
    }
  }

  onSearch() {
    // 筛选逻辑
    let filteredTours = this.allTours.filter(tour => {
        const matchName = !this.searchForm.name ||
            tour.itineraryName.toLowerCase().includes(this.searchForm.name.toLowerCase());

        const matchLocation = !this.searchForm.location ||
            tour.areaName.toLowerCase().includes(this.searchForm.location.toLowerCase());

        const matchMonth = !this.searchForm.month ||
            (tour.itineraryDate && tour.itineraryDate.some(date =>
                date.substring(5, 7) === this.searchForm.month
            ));

        const matchActivity = !this.searchForm.activityId ||
            tour.activityId === parseInt(this.searchForm.activityId);

        return matchName && matchLocation && matchMonth && matchActivity;
    });

    // 排序逻辑
    switch(this.searchForm.sortBy) {
        case 'popular':
            // 保持原有顺序
            break;
        case 'trendy':
            filteredTours.sort((a, b) => {
                const dateA = new Date(a.itineraryDate[0] || '');
                const dateB = new Date(b.itineraryDate[0] || '');
                return dateA.getTime() - dateB.getTime();
            });
            break;
        case 'latest':
            filteredTours.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
    }

    this.tours = filteredTours;
    this.currentPage = 1;
    this.calculatePages();
  }

  resetFilters() {
    this.searchForm = {
      name: '',
      location: '',
      month: '',
      activityId: '',
      sortBy: 'popular'
    };
    this.tours = [...this.allTours];
    this.currentPage = 1;
    this.calculatePages();
  }

}
