import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  id: string;
  products:any = [];

  constructor(
    private router: Router, 
    private data:DataService,
    private route:ActivatedRoute,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.showProducts();
  }

  async showProducts() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let id_arr = this.id.split('_');
    //console.log('id_arr[0]..............', id_arr[0]);

    if(id_arr[0] == "brand") {

      let sendData = {
        brand_id: id_arr[1]
      }
  
      this.data.productListByBrand(sendData).subscribe(
        res => {
          if(res.status == true){
            this.products = res.data;
            //console.log(this.products);
          } else {
            console.log("No response");
          }
        });
    } else if(id_arr[0] == "cat") {

      let sendData = {
        category_id: id_arr[1]
      }
  
      this.data.productListByCategory(sendData).subscribe(
        res => {
          if(res.status == true){
            this.products = res.data;
            //console.log(this.products);
          } else {
            console.log("No response");
          }
        });
    }
    
    this.hideLoader();
  }

  async presentLoading(loading) {
		return await loading.present();
  }
  
  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    });
  }

  moveProductDetails(product_id) {
    this.router.navigate(['/product-details/'+product_id]);
  }
}
