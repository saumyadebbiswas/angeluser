import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent implements OnInit {

  sess_customer_id:String;
  cart_number:number = 0;
  orders_fixed: any = [];
  orders: any = [];

  constructor(
    private router: Router,
    private data:DataService
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    //this.showOrders();
  }

  ionViewWillEnter(){
    this.showOrders();
    this.showCart();
  }

  showOrders() {
    let sendData = {
      customer_id: this.sess_customer_id
    }

    this.data.custOrderList(sendData).subscribe(
      res => {
        if(res.status == true){
          this.orders_fixed = res.data;
          this.orders = res.data;
          //console.log(this.orders);
        } else {
          console.log("No response");
        }
      });
  }

  onChange($event) {
    let status = $event.target.value;
    this.orders = [];
    
    this.orders_fixed.forEach(element => {
      if(status == -1) {
        this.orders.push(element);
      }
      else if(element.order_status == status) {
        this.orders.push(element);
      }
    });

    console.log('orders:......... ', this.orders);
  }

  moveOrderDetails(order_id) {
    this.router.navigate(['/enquiries/'+order_id]);
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
