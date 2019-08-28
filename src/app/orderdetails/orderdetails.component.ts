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
  ) { }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('id');

    this.showOrderItems();
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

}
