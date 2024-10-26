import { ItineraryService } from '../../../../service/itinerary-service/itinerary.service';
import { Itinerary } from 'src/app/interface/Product/itinerary.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-itinerary-detail',
  templateUrl: './itinerary-detail.component.html',
  styleUrls: ['./itinerary-detail.component.css']
})


export class ItineraryDetailComponent implements OnInit {
  tour: any;
  id: number | null = null;
  show = false;

  constructor(private route: ActivatedRoute, private itineraryService: ItineraryService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        this.id = parseInt(idParam, 10);
        this.itineraryService.getTourById(this.id).subscribe((data:Itinerary) => {
          this.tour = data;
          this.show = true;
          this.cdr.detectChanges();
        });
      } else {
        this.id = 0;
      }
    });
  }
}
