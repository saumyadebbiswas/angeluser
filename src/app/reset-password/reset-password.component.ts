import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  
  sess_customer_id:String;

  resetForm: FormGroup;
  oldpassword: string = "";
  newpassword: string = "";
  confpassword: string = "";

  constructor(
    private data: DataService,
    public alertCtrl: AlertController,
    public toastController: ToastController
  ) {
    this.sess_customer_id = localStorage.getItem("sess_cust_id");
  }

  ngOnInit() {
    this.resetForm = new FormGroup({
      oldpassword: new FormControl(),
      newpassword: new FormControl(),
      confpassword: new FormControl()
    });

    this.resetForm.patchValue({
      oldpassword: "",
      newpassword: "",
      confpassword: ""
    });
  }

  async onSubmit() {
    this.oldpassword = this.resetForm.get('oldpassword').value;
    this.newpassword = this.resetForm.get('newpassword').value;
    this.confpassword = this.resetForm.get('confpassword').value;

    if(this.oldpassword.trim() == "" || this.newpassword.trim() == "" || this.confpassword.trim() == "") {

      const alert = await this.alertCtrl.create({
        header: 'Error!',
        message: 'Enter full credentials!',
        buttons: ['OK']
      });
      alert.present();

    } else if(this.newpassword.trim() != this.confpassword.trim()) {

      const alert = await this.alertCtrl.create({
        header: 'Error!',
        message: 'New password not matched!',
        buttons: ['OK']
      });
      alert.present();

    } else {
      let sendData = {
        id: this.sess_customer_id,
        oldpassword: this.oldpassword.trim(),
        newpassword: this.newpassword.trim()
      }
      //console.log('Reset password sendData...', sendData);

      this.data.resetPassword(sendData).subscribe(
        async res => {  
          if(res.status == true) {
            //console.log(res);

            this.resetForm.patchValue({
              oldpassword: "",
              newpassword: "",
              confpassword: ""
            });

            const toast = await this.toastController.create({
              message: 'Password changed.',
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
