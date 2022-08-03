import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-complete-profile-setup',
  templateUrl: 'complete-profile-setup.html',
})
export class CompleteProfileSetupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteProfileSetupPage');
  }

}
