import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { ItineraryList } from 'src/app/interface/Product/itinerary-list.interface';
import { Activity } from 'src/app/interface/Product/Activity';
import { Search } from 'src/app/interface/Product/Search';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { theme_Activity } from 'src/app/interface/Product/Theme-Activity';
import { MyareaMember } from 'src/app/interface/Member/MyareaMember';


@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})

export class ItineraryListComponent implements OnInit {
  @ViewChild('searchFormDir') searchFormDir!: NgForm;
  activityNames: Activity[] = [];
  tours: ItineraryList[] = [];
  allTours: ItineraryList[] = [];
  region: number | null = null;
  itemsPerPage: number = 6;
  currentPage: number = 1;
  pages: number[] = [];
  themeActivities: theme_Activity[] = [];
  searchForm : Search = {
    name: '',
    location: '',
    month: '',
    activityId: 0,
    sortBy: 'default'
  };



  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadActivityNames();
    this.loadAllItineraries();
    this.onSearch();
    this.route.params.subscribe(params => {
      if (params['themeId']) {
        this.loadItinerariesByTheme(params['themeId']);
      } else if (params['activityId']) {
        this.loadItinerariesByActivity(params['activityId']);
      } else {
        this.loadAllItineraries();
      }
    });
  }

  onSearch() {
    this.itineraryService.searchItineraries(this.searchForm)
      .subscribe({
        next: (response) => {
          this.tours = response;
          this.calculatePages();
        },
        error: (error) => {
          console.error('搜尋失敗:', error);
        }
      });
  }

  onSortChange(sortType: string) {
    this.searchForm.sortBy = sortType;
    this.onSearch();
  }

  loadAllThemeActivities(): void {
    this.itineraryService.getAllThemeActivities()
      .subscribe({
        next: (data) => {
          this.themeActivities = data;
        },
        error: (error) => {
          console.error('獲取主題活動失敗:', error);
        }
      });
  }

  loadItinerariesByTheme(themeId: number): void {
    this.itineraryService.getItinerariesByTheme(themeId)
      .subscribe({
        next: (data) => {
          this.tours = data;
          this.calculatePages();
        },
        error: (error) => {
          console.error('獲取主題行程失敗:', error);
        }
      });
  }

  loadItinerariesByActivity(activityId: number): void {
    this.itineraryService.getItinerariesByActivity(activityId)
      .subscribe({
        next: (data) => {
          this.tours = data;
          this.calculatePages();
        },
        error: (error) => {
          console.error('獲取活動行程失敗:', error);
        }
      });
  }

  loadActivityNames(): void {
    this.itineraryService.getActivity()
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
        this.allTours = [...data];
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

  //星星數量
  getStarArray(count: number): number[] {
    return Array(count).fill(0);
  }

  getFullStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    const hasHalf = rating % 1 !== 0;
    return hasHalf;
  }

  getEmptyStars(rating: number): number[] {
    if (!rating) {
      return Array(5).fill(0);
    }
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    return Array(emptyStars).fill(0);
  }

  getStarRatingText(rating: number): string {
    if (!rating) return '0';

    // 取得小數點後的數字
    const decimal = rating % 1;

    if (decimal >= 0.8) {
      // 小數點 >= 0.8 無條件進位
      return Math.ceil(rating).toString();
    } else if (decimal >= 0.3 && decimal <= 0.7) {
      // 小數點在 0.3-0.7 之間，顯示 0.5
      return Math.floor(rating) + 0.5 + '';
    } else {
      // 小數點 < 0.3 無條件捨去
      return Math.floor(rating).toString();
    }
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

  resetFilters() {
    this.searchForm = {
      name: '',
      location: '',
      month: '',
      activityId: 0,
      sortBy: 'default'
    };
    this.tours = [...this.allTours];
    this.currentPage = 1;
    this.calculatePages();
  }

}
