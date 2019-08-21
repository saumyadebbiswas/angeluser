import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  sess_customer_id:String;
  quanty: any = {};

  cart:any = [];

  constructor(
    private data:DataService,
    private router:Router,
    public loadingController: LoadingController
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    this.showCart();
  }

  showCart() {
    let sendData = {
      customer_id: this.sess_customer_id
    }

    this.data.cartDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.cart = res.data;
          //console.log('Cart show details.........', this.cart);

          this.cart.forEach((elem, i) => {
            this.quanty[`qty_${i}`] = elem.cart_product_qty;
          });
        } else {
          console.log(res.message);
        }
      });
  }

  async cartRemove(cart_id) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let sendData = {
      cart_id: cart_id
    }

    this.data.cartRemove(sendData).subscribe(
      res => {
        if(res.status == true) {
          //console.log('Cart remove details.........', res.message);
          this.showCart();
        } else {
          console.log(res.message);
        }
      });
    
    this.hideLoader();
  }

  async cartUpdate(index, cart_id) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let qty = this.quanty[`qty_${index}`];
    let sendData = {
      cart_id: cart_id,
      product_qty: qty
    }
    //console.log('update sendData.........', sendData);

    this.data.cartUpdate(sendData).subscribe(
      res => {
        if(res.status == true) {
          //console.log('Cart update details.........', res.message);
          this.showCart();
        } else {
          console.log(res.message);
        }
      });
    
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

  addQty(index, type) {
    //console.log('index.......', index, type);
    
    if(type == 'm') {
      let qty = parseInt(this.quanty[`qty_${index}`]);
      if(qty>1) {
        this.quanty[`qty_${index}`] = qty - 1;
      }
    } else if(type == 'p') {
      let qty = parseInt(this.quanty[`qty_${index}`]);
      this.quanty[`qty_${index}`] = qty + 1;
    }
  }

  async placeOrder() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let sendData = {
      customer_id: this.sess_customer_id,
      cart_details: this.cart
    }
    //console.log('cart sendData..........', sendData);

    this.data.OrderInsert(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.router.navigate(['/brands']);
          //this.showCart();
        } else {
          console.log(res.message);
        }
      });
    
    this.hideLoader();
  }

}
