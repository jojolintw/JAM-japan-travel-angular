import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItineraryListComponent } from './Product/itinerary-list/itinerary-list.component';

import { TicketsComponent } from './Shipment/tickets/tickets.component';
import { DetailComponent } from './Shipment/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ItineraryListComponent,
    
    TicketsComponent,
          DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
