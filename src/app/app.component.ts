import { Component } from '@angular/core';

import { Platform, MenuController, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  sess_cust_name:any;
  sess_cust_phone:any;

  public appPages = [
    {
      title: 'Sign In',
      url: '/signin',
      icon: 'log-in'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Edit Profile',
      url: '/edit-profile',
      icon: 'logo-angular'
    }
  ];

  constructor(
    public menuCtrl: MenuController,
    private router: Router, 
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events
  ) {
    this.initializeApp();

    if(localStorage.getItem("sess_login_status") === null || localStorage.getItem("sess_login_status") === "") {
      this.router.navigate(['/signin']);
    }

    this.sess_cust_name = localStorage.getItem("sess_cust_name");
    this.sess_cust_phone = localStorage.getItem("sess_cust_phone");

    events.subscribe('userLogin', (data) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.sess_cust_name = localStorage.getItem("sess_cust_name");
      this.sess_cust_phone = localStorage.getItem("sess_cust_phone");
    });
    
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  moveBrand() {
    this.menuCtrl.close();
    this.router.navigate(['/brands']);
  }
  moveCart() {
    this.menuCtrl.close();
    this.router.navigate(['/cart']);
  }
  moveEnquiry() {
    this.menuCtrl.close();
    this.router.navigate(['/enquiry']);
  }
  moveSettings() {
    this.menuCtrl.close();
    this.router.navigate(['/settings']);
  }
  moveProfile() {
    this.menuCtrl.close();
    this.router.navigate(['/editprofile']);
  }
  moveResetPassword() {
    this.menuCtrl.close();
    this.router.navigate(['/reset-password']);
  }

  signOut() {
    localStorage.setItem("sess_login_status", "");
    localStorage.setItem("sess_cust_id", "");
    localStorage.setItem("sess_cust_name", "");
    localStorage.setItem("sess_cust_phone", "");
    localStorage.setItem("sess_cart_item", "");

    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.router.navigate(['/signin']);
  }
}
