import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {

  sess_customer_id:String;
  customer:any = [];
  customer_name: string;
  customer_city: string;

  customerForm: FormGroup;
  name: string;
  email: string;
  phone: string;
  city: string;
  birthday: string;
  image_name: any;
  image_path: string = "http://phpstack-304562-945735.cloudwaysapps.com/crm/upload/profile/";

  imageResponse:any = [];

  constructor(
    private data:DataService,
    private router:Router,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private imagePicker: ImagePicker,
    public toastController: ToastController,
    private datePicker: DatePicker
  ) { 
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );

    this.customerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      city: new FormControl(),
      birthday: new FormControl()
    });

    this.customerDetails();
  }

  customerDetails() {
    let sendData = {
      customer_id: this.sess_customer_id
    }

    this.data.customerDetails(sendData).subscribe(
      res => {
        console.log('cust data......', res);
        
        if(res.status == true) {
          this.customer = res.data;
          this.customer_name = res.data.cust_name;
          this.customer_city = res.data.cust_city;
          this.image_name = res.data.cust_image_name;

          this.customerForm.patchValue({
            name:res.data.cust_name,
            email:res.data.cust_email,
            phone:res.data.cust_phone,
            city:res.data.cust_city,
            birthday:res.data.cust_birthday
          });
        } else {
          console.log("No customer response");
        }
      });
  }

  getImages() {
    let options = {
      maximumImagesCount: 1,
      width: 200,
      quality: 25,
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }

      this.image_name = this.imageResponse[0];
      this.image_path = "";
    }, (err) => {
      alert(err);
    });
  }

  onSubmit() {
    this.name = this.customerForm.get('name').value;
    this.email = this.customerForm.get('email').value;
    this.phone = this.customerForm.get('phone').value;
    this.city = this.customerForm.get('city').value;
    this.birthday = this.customerForm.get('birthday').value;

    if(this.birthday != null){
      let date_split = this.birthday.split('T');
      this.birthday = date_split[0];
      //console.log('date......', date_split[0]);
    }

    if(this.imageResponse[0]==null){
      this.imageResponse[0] = "";
    }

    if(this.name.trim() == "" || this.email.trim() == "" 
    || this.phone.trim() == "" || this.city.trim() == "" || this.birthday == "" || this.birthday == null) {
      alert('Enter full credentials!');
    } else {
      let sendData = {
        id: this.sess_customer_id,
        name: this.name.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
        city: this.city.trim(),
        birthday: this.birthday,
        image_name: this.image_name,
        imagefile: this.imageResponse[0]
      }
      console.log(sendData);

      this.data.profileEdit(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            console.log(res);
            this.customer_name = this.name;
            this.customer_city = this.city;
            //this.router.navigate(['/brands']);
            const toast = await this.toastController.create({
              message: 'Profile updated.',
              color: "dark",
              position: "bottom",
              duration: 2000
            });
            toast.present(); 
          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error!',
              message: res.message,
              buttons: ['OK']
              });
              alert.present();
          }          
      });
    }
  }

}
