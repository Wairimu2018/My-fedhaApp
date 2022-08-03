import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Swal from 'sweetalert2'

import { LoginPage } from '../../pages/login/login';
import { HistoryPage } from '../../pages/history/history';
import { HelpPage } from '../../pages/help/help';
import { AboutUsPage } from '../../pages/about-us/about-us';
import { MyProfilePage } from '../../pages/my-profile/my-profile';
import { OurPolicyPage } from '../../pages/our-policy/our-policy';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  proceedToLogout() {

  	window.localStorage.setItem('xUMy-Fedha15__isLogged', 'false');

  	this.navCtrl.push(LoginPage);

  }

  requestLogout() {

    Swal.fire({
      title: 'Logout',
      text: 'Do you want to logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          this.proceedToLogout()

          } else if (result.dismiss === Swal.DismissReason.cancel) {

            /* Swal(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            ) */

          }
        })

  }

  viewHistory() {

    this.navCtrl.push(HistoryPage, {
      historyType: 'completed'
      });

  }

  viewHelp() {

    this.navCtrl.push(HelpPage);

  }

  viewPolicy() {

    this.navCtrl.push(OurPolicyPage);

  }

  viewAboutUs() {

    this.navCtrl.push(AboutUsPage);

  }

  viewProfile() {

    this.navCtrl.push(MyProfilePage);

  }

}
