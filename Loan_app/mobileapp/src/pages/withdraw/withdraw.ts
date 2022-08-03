import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2'

import { HistoryPage } from '../../pages/history/history';

@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  public apiLink: any;
  public showWithdrawalButton: any;
  public amountToWithdrawValue: any;
  public loader: any;
  public userAccountData: any;
  public withdrawalRequestData: any;
  public nbrOfNotifications: any;
  public nbrOfNotificationsLoop: any;
  public numberOfUserNotificationsData: any;

  @ViewChild('amountToWithdraw') requestedWithdrawalAmount;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingControl: LoadingController) {
    
    this.apiLink = "https://myfedha-loanapp.herokuapp.com";

    this.showWithdrawalButton = true;

    this.getUserAccountDetails();
    this.fetchNotifications();
    this.launchNotificationsFetch();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawPage');
  }

  presentAlert(alertTitle: String, alertMsg: String) {
    let thePopup = this.alertCtrl.create({
      title: ''+alertTitle+'',
      subTitle: ''+alertMsg+'',
      buttons: ['OK']
    });
    thePopup.present();
  }

  showLoading(loadingMessage: String) {
    this.loader = this.loadingControl.create({
      content: ""+loadingMessage
    });

    this.loader.present();
  }

  showSuccessMessage(successMessage: String) {

    Swal.fire(
      'Success!',
      ''+successMessage+'',
      'success'
      )

  }

  showErrorMessage(errorMessage: String) {

    Swal.fire(
      'Error!',
      ''+errorMessage+'',
      'error'
      )
    
  }

  getUserAccountDetails() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_user_account_details/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      userAccountData => {

        this.userAccountData = userAccountData;

        },err => {

        })

  }

  proceedToWithdraw() {

  	var amountToWithdraw = this.requestedWithdrawalAmount.value;
  	if(amountToWithdraw == '')
  	{
  		this.showErrorMessage('Please enter the amount to withdraw!');
  	}
  	else
  	{
      this.showLoading("Sending request, please wait ...");

      var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
      var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
      var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
      var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

      this.http.get(this.apiLink+'/rest_request_withdrawal/?amount='+amountToWithdraw+'&firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

        withdrawalRequestData => {

          this.loader.dismiss();

          if(withdrawalRequestData[0].result == '0') {

            this.showErrorMessage(withdrawalRequestData[0].error);
          }
          else
          {
            this.getUserAccountDetails();
            this.showWithdrawalButton = false;
            
            this.showSuccessMessage('Withdrawal request sent!');
            this.amountToWithdrawValue = '';

          }

          },err => {

            this.loader.dismiss();

          })
      
  	}

  }

  fetchNotifications() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_user_number_of_notifications/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      numberOfUserNotificationsData => {

        this.nbrOfNotifications = numberOfUserNotificationsData[0].numberOfUserNotifications;

        },err => {

        })

  }

  launchNotificationsFetch() {
    this.nbrOfNotificationsLoop = setInterval(() => {
    
    this.fetchNotifications();

    // clearInterval(this.nbrOfNotificationsLoop);

    }, 5000);
  }

  viewNotifications() {

    this.navCtrl.push(HistoryPage, {
      historyType: 'notifications'
      });

  }

}
