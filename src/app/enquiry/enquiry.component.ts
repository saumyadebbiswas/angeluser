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

  showDate(order_created) {
    if(order_created != null) {
      let order_created_arr = order_created.split(' ');
      
      let order_date_arr = order_created_arr[0].split('-');
      if(order_date_arr[1] == '01') { order_date_arr[1] = 'Jan' }
      else if(order_date_arr[1] == '02') { order_date_arr[1] = 'Feb' }
      else if(order_date_arr[1] == '03') { order_date_arr[1] = 'Mar' }
      else if(order_date_arr[1] == '04') { order_date_arr[1] = 'Apr' }
      else if(order_date_arr[1] == '05') { order_date_arr[1] = 'May' }
      else if(order_date_arr[1] == '06') { order_date_arr[1] = 'Jun' }
      else if(order_date_arr[1] == '07') { order_date_arr[1] = 'Jul' }
      else if(order_date_arr[1] == '08') { order_date_arr[1] = 'Aug' }
      else if(order_date_arr[1] == '09') { order_date_arr[1] = 'Sep' }
      else if(order_date_arr[1] == '10') { order_date_arr[1] = 'Oct' }
      else if(order_date_arr[1] == '11') { order_date_arr[1] = 'Nov' }
      else if(order_date_arr[1] == '12') { order_date_arr[1] = 'Dec' }

      let order_date = order_date_arr[1]+' '+order_date_arr[2]+', '+order_date_arr[0];

      let order_time_arr = order_created_arr[1].split(':');
      let meridian = 'AM';
      if(order_time_arr[0] > 12) {
        order_time_arr[0] = order_time_arr[0]%12;
        meridian = 'PM';
      }
      let order_time = order_time_arr[0]+':'+order_time_arr[1]+' '+meridian;

      return order_date+' '+order_time;
    } else {
      return '-';
    }
  }

  moveCart() {
    this.router.navigate(['/cart']);
  }

}
