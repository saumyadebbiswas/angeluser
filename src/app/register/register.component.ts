import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { AlertController } from '@ionic/angular';
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
    private router: Router, 
    private data: DataService, 
    public alertCtrl: AlertController) 
  {  
    if(localStorage.getItem("sess_cust_name") !== null && localStorage.getItem("sess_cust_name") !== "") {
      this.router.navigate(['/brands']);
    }
    
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
  }

  onSubmit() {
    console.log('Not yet ready!');
    
  }

}
