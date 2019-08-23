import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-otpnextpart',
  templateUrl: './otpnextpart.component.html',
  styleUrls: ['./otpnextpart.component.scss'],
})
export class OtpnextpartComponent implements OnInit {
  
  requestHeader: any = new HttpHeaders();

  constructor(
    public menuCtrl: MenuController,
    private router: Router
  ) { 
    if(localStorage.getItem("sess_login_status") == "1") {
      this.router.navigate(['/brands']);
    }

    this.menuCtrl.enable(false);
    
    //this.requestHeader.append("Accept", 'application/json');
    this.requestHeader.append('Content-Type', 'application/json'); 
  }

  ngOnInit() {}

  moveOTPVerify() {
    this.router.navigate(['/otpverify']); 
  }

}
