import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { AlertController, MenuController, LoadingController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  
  signupForm: FormGroup;
  name: string;
  address: string;
  email: string;
  phone: string;
  password: string;

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

    this.menuCtrl.enable(false);
    
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json'); 
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl()
    });

    this.signupForm.patchValue({
      name:"",
      address:"",
      email:"",
      phone:"",
      password:""
    });
  }

  async onSubmit() {
    //this.router.navigate(['/otpverify']); 
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);

    this.name = this.signupForm.get('name').value.trim();
    this.address = this.signupForm.get('address').value.trim();
    this.email = this.signupForm.get('email').value.trim();
    this.phone = this.signupForm.get('phone').value.trim();
    this.password = this.signupForm.get('password').value.trim();

    if(this.name != "" && this.address != "" && this.email != "" && this.phone != "" && this.password != "") {
      let sendData = {
        name: this.name,
        address: this.address,
        email: this.email,
        phone: this.phone,
        password: this.password
      }
      //console.log('sendData.........', sendData);

      this.data.custRegister(sendData).subscribe(
        async res => {  
          if(res.status == true) {         
            //console.log(res);

            localStorage.setItem("sess_login_status", "");
            localStorage.setItem("sess_cust_id", res.inserted_id);
            localStorage.setItem("sess_cust_name", this.name);
            localStorage.setItem("sess_cust_phone", this.phone);

            this.loadingController.dismiss();

            this.router.navigate(['/otpverify']); 
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
