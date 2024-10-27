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
import { BlogListComponent } from './components/Blog/blog-list/blog-list.component';

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
    BlogListComponent
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
