import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {

  brands: any = [];

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data: DataService
  ) { 
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.showBrands();
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

}
