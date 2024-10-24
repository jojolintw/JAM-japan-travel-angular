import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItineraryListComponent } from './Product/itinerary-list/itinerary-list.component';
import { ItineraryDetailComponent } from './Product/itinerary-detail/itinerary-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ItineraryListComponent,
    ItineraryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
