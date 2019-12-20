import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otpverify', component: OtpverifyComponent },
  { path: 'otpnextpart', component: OtpnextpartComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'categories/:brand_id', component: CategoriesComponent },
  { path: 'products/:id', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductdetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'enquiry', component: EnquiryComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'enquiries/:id', component: OrderdetailsComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
