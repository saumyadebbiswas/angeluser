import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { RegisterComponent } from './register/register.component';
import { OtpverifyComponent } from './otpverify/otpverify.component';
import { OtpnextpartComponent } from './otpnextpart/otpnextpart.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { CartComponent } from './cart/cart.component';
import { SettingsComponent } from './settings/settings.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent, 
    SigninComponent, 
    BrandsComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductdetailsComponent,
    EnquiryComponent,
    RegisterComponent,
    OtpverifyComponent,
    OtpnextpartComponent,
    ThankyouComponent,
    EditprofileComponent,
    CartComponent,
    SettingsComponent,
    CheckoutComponent,
    OrderdetailsComponent,
    ResetPasswordComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}






// <?xml version="1.0" encoding="utf-8"?>
// <network-security-config>
//     <base-config cleartextTrafficPermitted="true">
//         <trust-anchors>
//             <certificates src="system" />
//         </trust-anchors>
//     </base-config>
//     <domain-config cleartextTrafficPermitted="true">
//         <domain includeSubdomains="true">localhost</domain>
//         <domain includeSubdomains="true">www.omdbapi.com</domain>
//         <domain includeSubdomains="true">www.cloudinary.com</domain>
//         <domain includeSubdomains="true">52.64.252.144:3000</domain>
//         <domain includeSubdomains="true">cloudwaysapps.com</domain>
//         <domain includeSubdomains="true">bootstrapcdn.com</domain>
//         <domain includeSubdomains="true">googleapis.com</domain>
//         <domain includeSubdomains="true">cloudflare.com</domain>
//     </domain-config>
// </network-security-config>