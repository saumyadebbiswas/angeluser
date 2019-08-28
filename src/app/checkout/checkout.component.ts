import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  sess_customer_id:String;
  cart:any = [];
  customer:any = [];
  payment_type:any = 1;
  total_amount:any = 0;
  total_item:any = 0;

  customerForm: FormGroup;
  name: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  pin: string;
  state: string;

  constructor(
    private data:DataService,
    private router:Router,
    public alertCtrl: AlertController,
    public loadingController: LoadingController
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
    this.cart = JSON.parse(localStorage.getItem("sess_cart_item"));
  }

  ngOnInit() {
    let amount = 0;
    let items = 0;
    this.cart.forEach(element => {
      amount += (element.cart_product_qty * element.pro_qty_per_box * element.pro_price_per_piece);
      items += parseInt(element.cart_product_qty);
    });

    this.total_amount = amount;
    this.total_item = items;
    //console.log('cart items:........... ', this.cart);
    
    this.customerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      pin: new FormControl(),
      state: new FormControl()
    });

    this.customerDetails();
  }

  customerDetails() {
    let sendData = {
      customer_id: this.sess_customer_id
    }

    this.data.customerDetails(sendData).subscribe(
      res => {
        if(res.status == true) {
          this.customer = res.data;

          this.customerForm.patchValue({
            name:res.data.cust_name,
            email:res.data.cust_email,
            phone:res.data.cust_phone,
            address:res.data.cust_address,
            address2:"",
            city:"",
            pin:"",
            state:""
          });
        } else {
          console.log("No response");
        }
      });
  }

  radioChecked(value) {
    console.log('radio value.... ', value);
    if(value == 1){
      this.payment_type = 1;
    } else if(value == 2){
      this.payment_type = 2;
    }
  }

  async onSubmit() {
    //this.router.navigate(['/otpverify']); 
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.name = this.customerForm.get('name').value.trim();
    this.email = this.customerForm.get('email').value.trim();
    this.phone = this.customerForm.get('phone').value.trim();
    this.address = this.customerForm.get('address').value.trim();
    this.address2 = this.customerForm.get('address2').value.trim();
    this.city = this.customerForm.get('city').value.trim();
    this.pin = this.customerForm.get('pin').value.trim();
    this.state = this.customerForm.get('state').value.trim();

    if(this.name != "" && this.address != "" && this.email != "" && this.phone != "" && this.city != "" && this.pin != "" && this.state != "") {
      let sendData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        address2: this.address2,
        city: this.city,
        pin: this.pin,
        state: this.state,
        payment_type: this.payment_type,
        customer_id: this.sess_customer_id,
        cart_details: this.cart
      }
      //console.log('sendData.........', sendData);

      this.data.OrderInsert(sendData).subscribe(
        res => {
          if(res.status == true) {
            this.router.navigate(['/thankyou']);
            //this.showCart();
          } else {
            console.log(res.message);
          }
        });

      this.loadingController.dismiss();
    } else {
      this.loadingController.dismiss();
      
      const alert = await this.alertCtrl.create({
        header: 'Error!',
        message: 'Enter full credentials!',
        buttons: ['OK']
        });
      alert.present();
    }
    
  }

  async presentLoading(loading) {
		return await loading.present();
  }

}
