import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItineraryListComponent } from './components/product/itinerary-list/itinerary-list.component';
import { ItineraryDetailComponent } from './components/product/itinerary-detail/itinerary-detail.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailComponent } from './components/Shipment/detail/detail.component';
import { TicketComponent } from './components/Shipment/ticket/ticket.component';

const routes: Routes = [
  { path: 'itinerary-list', component: ItineraryListComponent },
  { path: 'itinerary-list/area_:region', component: ItineraryListComponent },
  { path: 'itinerary-detail/:id', component: ItineraryDetailComponent },
  { path: '', component:HomePageComponent },
  { path: 'home', component:HomePageComponent },
  { path: 'shipment-detail', component: DetailComponent },
  { path: 'shipment-ticket', component: TicketComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
