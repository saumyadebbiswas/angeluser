import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  sess_customer_id:String;
  quanty: any = {};
  cart_number:number = 0;
  cart:any = [];

  constructor(
    private data:DataService,
    private router:Router,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    //this.showCart();
  }

  ionViewWillEnter() {
    this.showCart();
  }

  showCart() {
    let sendData = {
      customer_id: this.sess_customer_id
    }

    this.data.cartDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.cart_number = res.data.length;
          this.cart = res.data;
          //console.log('Cart show details.........', this.cart);

          this.cart.forEach((elem, i) => {
            this.quanty[`qty_${i}`] = elem.cart_product_qty;
          });
        } else {
          this.quanty = {};
          this.cart_number = 0;
          this.cart = [];
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
      async res => {
        if(res.status == true) {
          //console.log('Cart update details.........', res.message);
          //this.showCart();
          
          const toast = await this.toastController.create({
            message: 'Cart updated.',
            color: "dark",
            position: "bottom",
            duration: 2000
          });
          toast.present();
        } else {
          console.log(res.message);
          const toast = await this.toastController.create({
            message: 'Error: ' + res.message,
            color: "dark",
            position: "bottom",
            duration: 2000
          });
          toast.present();
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

  async addQty(index, type, min_order) {
    //console.log('index.......', index, type);
    
    if(type == 'm') {
      let qty = parseInt(this.quanty[`qty_${index}`]);
      if(qty > min_order) {
        this.quanty[`qty_${index}`] = qty - 1;
      } else {
        const toast = await this.toastController.create({
          message: 'Minimum order ' + min_order,
          color: "dark",
          position: "bottom",
          duration: 2000
        });
        toast.present();
      }
    } else if(type == 'p') {
      let qty = parseInt(this.quanty[`qty_${index}`]);
      this.quanty[`qty_${index}`] = qty + 1;
    }
  }

  async placeOrder() {
    // const loading = await this.loadingController.create({
    //   message: 'Please wait...'
    // });
    // this.presentLoading(loading);

    this.cart.forEach((elem, i) => {
      this.cart[i].cart_product_qty = this.quanty[`qty_${i}`];
    });

    localStorage.setItem("sess_cart_item", JSON.stringify(this.cart));

    this.router.navigate(['/checkout']);

    // let sendData = {
    //   customer_id: this.sess_customer_id,
    //   cart_details: this.cart
    // }
    // console.log('cart sendData..........', sendData);

    /*this.data.OrderInsert(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.router.navigate(['/brands']);
          //this.showCart();
        } else {
          console.log(res.message);
        }
      });*/
    
    // this.hideLoader();
  }

}
