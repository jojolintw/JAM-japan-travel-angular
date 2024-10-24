import { Component } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  
    ngOnInit(): void {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/css/slick.min.css';
      document.head.appendChild(link);
    }
  
  
}
