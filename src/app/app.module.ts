import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItineraryListComponent } from './components/product/itinerary-list/itinerary-list.component';
import { ItineraryDetailComponent } from './components/product/itinerary-detail/itinerary-detail.component';
import { ItineraryService } from '../service/itinerary-service/itinerary.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/share/header/header.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { CartComponent } from './components/Order/cart/cart.component';
import { CheckoutComponent } from './components/Order/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/Order/order-confirmation/order-confirmation.component';
import { SignupComponent } from './components/Member/signup/signup.component';
import { SigninComponent } from './components/Member/signin/signin.component';
import { ForgetpasswordComponent } from './components/Member/forgetpassword/forgetpassword.component';
import { MemberareaComponent } from './components/Member/memberarea/memberarea.component';
import { AccountComponent } from './components/Member/account/account.component';
import { CouponComponent } from './components/Member/coupon/coupon.component';
import { MycollectionComponent } from './components/Member/mycollection/mycollection.component';
import { MyorderComponent } from './components/Member/myorder/myorder.component';
import { ResetpasswordComponent } from './components/Member/resetpassword/resetpassword.component';
import { DetailComponent } from './components/Shipment/detail/detail.component';
import { TicketComponent } from './components/Shipment/ticket/ticket.component';
import { BlogListComponent } from './components/Blog/blog-list/blog-list.component';



const routes: Routes = [
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,

    SignupComponent,
    SigninComponent,
    ForgetpasswordComponent,
    MemberareaComponent,
    AccountComponent,
    CouponComponent,
    MycollectionComponent,
    MyorderComponent,
    ResetpasswordComponent,

    ItineraryListComponent,
    ItineraryDetailComponent,

    DetailComponent,
    TicketComponent,

    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,

    BlogListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [ItineraryService],
  bootstrap: [AppComponent],
})
export class AppModule { }
