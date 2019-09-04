import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-otpverify',
  templateUrl: './otpverify.component.html',
  styleUrls: ['./otpverify.component.scss'],
})
export class OtpverifyComponent implements OnInit {
  
  sess_customer_id:String;
  me_staffs:any = [];
  
  otpSendForm: FormGroup;
  staff_phone:string;
  
  requestHeader: any = new HttpHeaders();

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data:DataService,
    public alertCtrl: AlertController,
    public loadingController: LoadingController
  ) { 
    if(localStorage.getItem("sess_login_status") == "1") {
      this.router.navigate(['/brands']);
    }

    this.sess_customer_id = localStorage.getItem("sess_cust_id");

    this.menuCtrl.enable(false);
    
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json'); 
  }

  ngOnInit() {
    this.otpSendForm = new FormGroup({
      staff_phone: new FormControl()
    });

    this.showMEStaff();
  }

  showMEStaff() {
    this.data.marketingStaffList().subscribe(
      res => {
        if(res.status == true) {
          this.me_staffs = res.data;
          console.log(this.me_staffs);
        } else {
          console.log("No response");
        }
      });
  }

  async onSubmit() { 
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.staff_phone = this.otpSendForm.get('staff_phone').value;

    if(this.staff_phone != null && this.staff_phone != "") {
      let sendData = {
        customer_id: this.sess_customer_id,
        staff_phone: this.staff_phone
      }
      //console.log('sendData.........', sendData);

      this.data.custOtpSend(sendData).subscribe(
        async res => {  
          console.log('otp data.....', res);
          
          if(res.status == true) {
            this.loadingController.dismiss();
            this.router.navigate(['/otpnextpart']);
          } else {
            this.loadingController.dismiss();

            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: 'Error to send message. Try again.',
              buttons: ['OK']
              });
            alert.present();
          }          
      });
    } else {
      this.loadingController.dismiss();
      
      const alert = await this.alertCtrl.create({
        header: 'Error!',
        message: 'Select a agent!',
        buttons: ['OK']
        });
      alert.present();
    }
  }

  async presentLoading(loading) {
		return await loading.present();
  }

}
