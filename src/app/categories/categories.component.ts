import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  sess_customer_id:String;
  cart_number:number = 0;
  brand_id: string;
  categories: any = [];

  constructor(
    private data: DataService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    this.brand_id = this.route.snapshot.paramMap.get('brand_id');

    this.showCatergories();
    this.showCart();
  }  

  showCatergories() {
    let sendData = {
      brand_id: this.brand_id
    }

    this.data.categoryList(sendData).subscribe(
      res => {
        if(res.status == true){
          this.categories = res.data;
          //console.log(this.categories);
        } else {
          console.log("No response");
        }
      });
  }

  moveProduct(type, category_id) {
    if(type=='B')
      this.router.navigate(['/products/brand_'+category_id]);
    else if(type=='C')
      this.router.navigate(['/products/cat_'+category_id]);
  }

  showCart() {
    let sendData = {
      customer_id: this.sess_customer_id
    }

    this.data.cartDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.cart_number = res.data.length;
        }
      });
  }

  moveCart() {
    this.router.navigate(['/cart']);
  }

}
