import { Component } from '@angular/core';

@Component({
  selector: 'app-itinerary-list',
  templateUrl: './itinerary-list.component.html',
  styleUrls: ['./itinerary-list.component.css']
})
export class ItineraryListComponent {
  ngOnInit(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/slick.min.css';
    document.head.appendChild(link);
  }

}
