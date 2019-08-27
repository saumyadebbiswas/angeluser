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
  products_fixed:any = [];
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
          if(res.status == true) {
            this.products_fixed = res.data;
            this.products = res.data;
            // console.log('products_fixed..........', this.products_fixed);
            // console.log('products..........', this.products);
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
          if(res.status == true) {
            this.products_fixed = res.data;
            this.products = res.data;
            // console.log('products_fixed..........', this.products_fixed);
            // console.log('products..........', this.products);
          } else {
            console.log("No response");
          }
        });
    }
    
    this.loadingController.dismiss();
  }

  async presentLoading(loading) {
		return await loading.present();
  }

  moveProductDetails(product_id) {
    this.router.navigate(['/product-details/'+product_id]);
  }
  
  updateList(event) {
    let search_value = event.target.value;

    this.products = [];

    if(search_value.length >= 3) {
      //console.log('search value:............ ', search_value);
      this.products_fixed.forEach(element => {
        let product_name = element.pro_name.toLowerCase();
        search_value = search_value.toLowerCase();

        if(product_name.includes(search_value)){
          this.products.push(element);
        }
      });
      //console.log('this.products:............ ', this.products);
    } else {
      this.products = this.products_fixed;
    }
  }
}
