import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ItineraryListComponent } from './components/product/itinerary-list/itinerary-list.component';
import { ItineraryDetailComponent } from './components/product/itinerary-detail/itinerary-detail.component';
import { ItineraryService } from './service/Itinerary/itinerary.service';
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
import { MemberorderdetailComponent } from './components/Member/memberorderdetail/memberorderdetail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ArticleService } from './service/Blog/article.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlogDetailComponent } from './components/Blog/blog-detail/blog-detail.component';
import { BlogWriteComponent } from './components/Blog/blog-write/blog-write.component';


import { AuthInterceptor } from './interface/Login/AuthInterceptor';
import { RegistercompleleComponent } from './components/Member/registercomplele/registercomplele.component';
import { CertificationSuccessComponent } from './components/Member/certification-success/certification-success.component';
import { SafePipe } from './components/Shipment/safe.pipe';
import { ResetPasswordEmailComponent } from './components/Member/reset-password-email/reset-password-email.component';
import { ResetPasswordCompleteComponent } from './components/Member/reset-password-complete/reset-password-complete.component';
import { ScheduleDetailComponent } from './components/Shipment/schedule-detail/schedule-detail.component';
import { Cart2Component } from './components/Shipment/cart2/cart2.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MymemberlevelComponent } from './components/Member/mymemberlevel/mymemberlevel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyfavoritePipe } from './pipe/Member/myfavorite.pipe';
import { QuillModule } from 'ngx-quill';




const routes: Routes = [
  { path: 'shipment/:routeId', component: DetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,

    BlogWriteComponent,

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
    SafePipe,

    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,

      BlogListComponent,
      MemberorderdetailComponent,

      BlogDetailComponent,
      RegistercompleleComponent,
      CertificationSuccessComponent,
      ResetPasswordEmailComponent,
      ResetPasswordCompleteComponent,
      ScheduleDetailComponent,
      Cart2Component,
      MymemberlevelComponent,
      MyfavoritePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),  // 导入 QuillModule
  ],
  providers: [ItineraryService,ArticleService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],


})
export class AppModule { }
