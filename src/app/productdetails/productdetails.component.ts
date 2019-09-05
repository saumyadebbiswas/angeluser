import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {

  //Configuration for Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
  };

  isBeginningSlide: any = true;
  isEndSlide: any = false;

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }
 
  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }
 
  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      this.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      this.isEndSlide = istrue;
    });
  }

  sess_customer_id:String;

  product_id: string;
  product:any = [];
  allimages:any = [];

  check_cart: any = false;
  quanty:string;
  product_price:any;
  qty_per_box:any;

  constructor(
    private route:ActivatedRoute, 
    private data:DataService,
    private router: Router, 
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    this.product_id = this.route.snapshot.paramMap.get('id');

    this.showProduct();
  }

  async showProduct() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let sendData = {
      product_id: this.product_id
    }

    this.data.productDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.product = res.data;
          this.quanty = res.data.pro_min_order_box_qty;
          this.qty_per_box = res.data.pro_qty_per_box;
          this.product_price = res.data.pro_price_per_piece;

          let productimages = res.data.productimages;
          if(productimages.length > 0) {
            productimages.forEach(element => {
              this.allimages.push(element.proimg_image_name);
            });
          }

          this.checkCart();
          //console.log('product.............', this.product);
        } else {
          this.checkCart();
          //this.product = res.message;
          console.log("No response");
        }
      });

    this.loadingController.dismiss();
  }

  async presentLoading(loading) {
		return await loading.present();
  }

  async addQty(type, min_order) {
    if(type == 'm') {
      let qty = parseInt(this.quanty);
      if(qty > min_order) {
        this.quanty = String(qty - 1);
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
      let qty = parseInt(this.quanty);
      this.quanty = String(qty + 1);
    }
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
          this.check_cart = true;
          this.quanty = res.data[0].cart_product_qty;
        } else {
          console.log(res.message);
        }          
    });
  }

  addToCart(product_price, min_order) {
    let sendData = {
      customer_id: this.sess_customer_id,
      product_id: this.product_id,
      product_old_price: product_price,
      min_order_old: min_order,
      product_qty: this.quanty
    }
    //console.log('add cart sendData........', sendData);

    this.data.cartAdd(sendData).subscribe(
      async res => {  
        if(res.status == true) {
          //console.log('Add to cart.........', res);
          this.check_cart = true; 

          const toast = await this.toastController.create({
            message: 'Added to cart successfully.',
            color: "dark",
            position: "bottom",
            duration: 2000
          });
          toast.present();
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

  moveCart() {
    this.router.navigate(['/cart']);
  }

}
