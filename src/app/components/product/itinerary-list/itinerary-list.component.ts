import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RouterLink } from '@angular/router';
import { Route } from '@angular/router';
import { ItineraryService } from 'src/service/itinerary-service/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';




@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})

export class ItineraryListComponent implements OnInit {
  tours: Itinerary[] = [];
  region: number | null = null;
  totalItems: number = this.tours.length; // 总条目数
  itemsPerPage: number = 9; // 每页显示的条目数
  currentPage: number = 1; // 当前页码
  displayedTours: Itinerary[] = []; // 当前显示的数据



  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService) { }

  ngOnInit(): void {
    this.loadAllItineraries();
    this.route.params.subscribe((params) => {
      const regionParam = params['region'];
      if (regionParam) {
        this.region = parseInt(regionParam.replace('area_', ''), 10);
        this.loadItinerariesByRegion(this.region);
      }
    });
  }
  loadAllItineraries(): void {
    this.itineraryService.getItineraries().subscribe({
      next: (data) => {
        this.tours = data;
        this.totalItems = this.tours.length;
        this.paginate();
      },
      error: (error) => {
        console.error('獲取行程數據失敗:', error);
      }
    });
  }

  loadItinerariesByRegion(region: number): void {
    this.itineraryService.getItinerariesByRegion(region).subscribe({
      next: (data) => {
        this.tours = data;
        this.totalItems = this.tours.length;
        this.paginate();
      },
      error: (error) => {
        console.error('獲取行程數據失敗:', error);
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
