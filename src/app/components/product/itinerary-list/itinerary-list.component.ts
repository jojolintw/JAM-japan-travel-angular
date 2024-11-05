import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { ItineraryService } from 'src/app/service/Itinerary/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { Activity } from 'src/app/interface/Product/Activity';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})

export class ItineraryListComponent implements OnInit {
  @ViewChild('searchFormDir') searchFormDir!: NgForm;

  activityNames: Activity[] = [];
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
    activityId: 0,
    sortBy: 'popular'
  };



  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this.loadActivityNames();
    this.loadAllItineraries();
    this.onSearch(); // 初始加載
    // this.route.params.subscribe((params) => {
    //   const regionParam = params['region'];
    //   if (regionParam) {
    //     this.region = parseInt(regionParam.replace('area_', ''), 10);
    //     this.loadItinerariesByRegion(this.region);
    //   }
    // });
  }
  onSearch() {
    console.log('Submitting search form:', this.searchForm); // 調試用

    this.itineraryService.searchItineraries(this.searchForm)
      .subscribe({
        next: (data) => {
          console.log('Search results:', data); // 調試用
          this.tours = data;
          this.currentPage = 1;
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

  resetFilters() {
    this.searchForm = {
      name: '',
      location: '',
      month: '',
      activityId: 0,
      sortBy: 'popular'
    };
    this.tours = [...this.allTours];
    this.currentPage = 1;
    this.calculatePages();
  }

}
