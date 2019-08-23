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
  
  me_staffs:any = [];
  
  otpSendForm: FormGroup;
  staff_id:string;
  
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

    this.menuCtrl.enable(false);
    
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json'); 
  }

  ngOnInit() {
    this.otpSendForm = new FormGroup({
      staff_id: new FormControl()
    });

    this.showMEStaff();
  }

  showMEStaff() {
    this.data.marketingStaffList().subscribe(
      res => {
        if(res.status == true) {
          this.me_staffs = res.data;
          //console.log(this.brand);
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

    this.staff_id = this.otpSendForm.get('staff_id').value;

    if(this.staff_id != null && this.staff_id != "") {
      let sendData = {
        staff_id: this.staff_id
      }
      //console.log('sendData.........', sendData);

      this.router.navigate(['/otpnextpart']); 

      this.loadingController.dismiss();
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
