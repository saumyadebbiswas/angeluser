import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-otpnextpart',
  templateUrl: './otpnextpart.component.html',
  styleUrls: ['./otpnextpart.component.scss'],
})
export class OtpnextpartComponent implements OnInit {
  
  sess_customer_id:String;
  
  otpCheckForm: FormGroup;
  otp:string;
  
  requestHeader: any = new HttpHeaders();

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data: DataService,
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
    this.otpCheckForm = new FormGroup({
      otp: new FormControl()
    });
  }

  async onSubmit() { 
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.otp = this.otpCheckForm.get('otp').value;

    if(this.otp != null && this.otp != "") {
      let sendData = {
        customer_id: this.sess_customer_id,
        otp: this.otp
      }
      console.log('sendData.........', sendData);

      this.data.custOtpCheck(sendData).subscribe(
        async res => {  
          console.log('otp data.....', res);
          
          if(res.status == true) {
            this.loadingController.dismiss();
            this.router.navigate(['/signin']);
          } else {
            this.loadingController.dismiss();

            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: res.message,
              buttons: ['OK']
              });
            alert.present();
          }          
      });
    } else {
      this.loadingController.dismiss();
      
      const alert = await this.alertCtrl.create({
        header: 'Error!',
        message: 'Enter OTP!',
        buttons: ['OK']
        });
      alert.present();
    }
  }

  async presentLoading(loading) {
		return await loading.present();
  }

  moveOTPVerify() {
    this.router.navigate(['/otpverify']); 
  }

}
