import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  sess_customer_id:String;

  product_id: string;
  product:any = [];

  check_cart: any = false;

  constructor(
    private route:ActivatedRoute, 
    private data:DataService,
    public alertCtrl: AlertController
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    this.product_id = this.route.snapshot.paramMap.get('id');

    this.showProduct();
    this.checkCart();
  }

  showProduct() {
    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.product = res.data;
          //console.log(this.product);
        } else {
          this.product = res.message;
          //console.log("No response");
        }
      });
  }

  checkCart() {
    let sendData = {
      customer_id: this.sess_customer_id,
      product_id: this.product_id
    }
    //console.log(sendData);

    this.data.cartCheck(sendData).subscribe(
      async res => {  
        if(res.status == true) {
          //console.log(res);
          this.check_cart = true;
        } else {
          console.log(res.message);
        }          
    });
  }

  addToCart(product_price) {
    let sendData = {
      customer_id: this.sess_customer_id,
      product_id: this.product_id,
      product_old_price: product_price,
      product_qty: "1"
    }
    //console.log('add cart sendData........', sendData);

    this.data.cartAdd(sendData).subscribe(
      async res => {  
        if(res.status == true) {
          //console.log('Add to cart.........', res);
          this.check_cart = true; 
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error!',
            message: res.message,
            buttons: ['OK']
            });
          alert.present();
        }          
    });
  }

}
