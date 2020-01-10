import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
})
export class OrderdetailsComponent implements OnInit {

  sess_customer_id:String;
  cart_number:number = 0;
  order_id: string;
  order_items: any = [];
  order_details: any = [];
  total_amount:any = 0;
  total_item:any = 0;

  constructor(
    private router: Router,
    private data: DataService,
    private route:ActivatedRoute,
    public alertCtrl: AlertController,
    public loadingController: LoadingController
  ) {
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('id');

    this.showOrderItems();
    this.showCart();
  }  

  clickBack(): void {
    this.router.navigate(['/enquiry']);
  }

  async showOrderItems() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    let sendData = {
      order_id: this.order_id
    }

    this.data.orderItemList(sendData).subscribe(
      res => {
        if(res.status == true){
          this.order_items = res.data.order_items;
          this.order_details = res.data[0];
          
          let amount = 0;
          let items = 0;
          this.order_items.forEach(element => {
            amount += (element.oi_quantity * element.pro_qty_per_box * element.oi_old_price);
            items += parseInt(element.oi_quantity);
          });

          this.total_amount = amount;
          this.total_item = items;
          //console.log('res.data:....... ', res.data);
        } else {
          console.log("No response");
        }
      });
    
      this.loadingController.dismiss();
  }

  async presentLoading(loading) {
    return await loading.present();
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
