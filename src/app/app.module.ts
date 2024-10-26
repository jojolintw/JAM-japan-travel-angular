import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItineraryListComponent } from './components/product/itinerary-list/itinerary-list.component';
import { ItineraryDetailComponent } from './components/product/itinerary-detail/itinerary-detail.component';
import { ItineraryService } from '../service/itinerary-service/itinerary.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/share/header/header.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { CartComponent } from './components/Order/cart/cart.component';
import { CheckoutComponent } from './components/Order/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/Order/order-confirmation/order-confirmation.component';

const routes: Routes = [
];


@NgModule({
  declarations: [
    AppComponent,
    ItineraryListComponent,
    ItineraryDetailComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItineraryService],
  bootstrap: [AppComponent],
})
export class AppModule { }
