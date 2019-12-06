import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {

  brands: any = [];
  subscription:any;

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data: DataService,
    private platform: Platform
  ) { 
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.showBrands();
  }

  ionViewWillEnter(){ 
    if(localStorage.getItem("sess_login_status") != "1") {
      this.menuCtrl.enable(false);
      this.router.navigate(['/signin']);
    }
  }

  ionViewDidEnter(){ 
    this.subscription = this.platform.backButton.subscribe(()=>{ 
      navigator['app'].exitApp(); 
    }); 
  } 

  ionViewWillLeave(){ 
    this.subscription.unsubscribe();
  }

  showBrands() {
    this.data.brandList().subscribe(
      res => {
        if(res.status == true){
          this.brands = res.data;
          console.log(this.brands);
        } else {
          console.log("No response");
        }
      });
  }

  moveCategory(brand_id) {
    this.router.navigate(['/categories/'+brand_id]);
  }

  moveCart() {
    this.router.navigate(['/cart']);
  }

}
