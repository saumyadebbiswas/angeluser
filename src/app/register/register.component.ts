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
  name: String;
  address: String;
  email: String;
  phone: String;
  password: String;

  requestHeader: any = new HttpHeaders();

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private data: DataService, 
    public alertCtrl: AlertController,
    public loadingController: LoadingController
    ) {  
    if(localStorage.getItem("sess_cust_name") !== null && localStorage.getItem("sess_cust_name") !== "") {
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

      console.log('sendData.........', sendData);

      this.loadingController.dismiss();
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

}
