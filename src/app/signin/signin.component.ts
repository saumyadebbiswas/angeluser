import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, Platform, AlertController, Events, MenuController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {
  
  signinForm: FormGroup;
  phone: String;
  password: String;
  requestHeader: any = new HttpHeaders();
  subscription:any;

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data: DataService, 
    public alertCtrl: AlertController,
    public events: Events,
    public loadingController: LoadingController,
    private platform: Platform
  ) {  
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter(){ 
    if(localStorage.getItem("sess_login_status") == "1") {
      this.router.navigate(['/brands']);
    }
  }

  ionViewDidEnter(){ 
    this.subscription = this.platform.backButton.subscribe(()=>{ 
      navigator['app'].exitApp(); 
    }); 
  } 

  ionViewWillLeave(){ 
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      phone: new FormControl(),
      password: new FormControl()
    });

    this.signinForm.patchValue({
      phone:"",
      password:""
    });
  }

  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.phone = this.signinForm.get('phone').value.trim();
    this.password = this.signinForm.get('password').value.trim();

    if(this.phone != null && this.password != null) {
      let sendData = {
        phone: this.phone,
        password: this.password
      }

      this.data.login(sendData).subscribe(
        async res => {  
          if(res.status == true) {         
            //console.log(res);

            localStorage.setItem("sess_login_status", "1");
            localStorage.setItem("sess_cust_id", res.data.cust_id);
            localStorage.setItem("sess_cust_name", res.data.cust_name);
            localStorage.setItem("sess_cust_phone", res.data.cust_phone);

            this.events.publish('userLogin', JSON.stringify({loggedin: true}));
            this.menuCtrl.enable(true);

            this.loadingController.dismiss();

            this.router.navigate(['/brands']); 
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
      
      //alert("Enter full credentials!");
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

  moveRegister() {
    this.router.navigate(['/register']);
  }

}
