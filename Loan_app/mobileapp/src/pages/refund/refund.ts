import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
// import { AnimationService, AnimationBuilder } from 'css-animator';
import Swal from 'sweetalert2'

import { HistoryPage } from '../../pages/history/history';

@Component({
  selector: 'page-refund',
  templateUrl: 'refund.html',
})
export class RefundPage {

  public apiLink: any;
  // private animator: AnimationBuilder;
  public showLoanPaymentSteps: any;
  public showPayLoan: any;
  public amountToPayValue: any;
  public loader: any;
  public showRefundForm: any;
  public nbrOfUrgentActionsLoop: any;
  public loanRefundData: any;
  public userAccountData: any;
  public nbrOfNotifications: any;
  public nbrOfNotificationsLoop: any;
  public numberOfUserNotificationsData: any;
  
  @ViewChild('loanPaymentStepsElement') loanPaymentStepsEl;
  @ViewChild('amountToRefund') suggestedAmountToPay;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingControl: LoadingController) { // , animationService: AnimationService
  	
    this.apiLink = "https://myfedha-loanapp.herokuapp.com";

    // this.animator = animationService.builder();

  	this.showPayLoan = true;
  	this.showLoanPaymentSteps = false;

    this.getUserAccountDetails();
    this.fetchNotifications();
    this.launchNotificationsFetch();
    this.getUrgentAction();
    this.launchUrgentActionFetch();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
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

  payLoan() {

    var amountToPay = this.suggestedAmountToPay.value;
    if(amountToPay == '')
    {
      this.showErrorMessage('Please enter the amount to pay!');
    }
    else
    {
      this.showLoading("Sending request, please wait ...");

      var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
      var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
      var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
      var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

      this.http.get(this.apiLink+'/rest_refund_loan/?amount='+amountToPay+'&firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

        loanRefundData => {

          this.loader.dismiss();

          if(loanRefundData[0].result == '0') {

            this.showErrorMessage(loanRefundData[0].error);
          }
          else
          {
            this.getUserAccountDetails();

            this.showSuccessMessage(loanRefundData[0].success);

            this.loanRefundData = loanRefundData;
            
            this.showLoanPaymentSteps = true;
            /* this.animator.setType('flipInX').show(this.loanPaymentStepsEl.nativeElement); */
            this.showPayLoan = false;
            this.amountToPayValue = '';

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

  getUrgentAction() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_user_urgent_action/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      userUrgentActionData => {

        if(userUrgentActionData[0].urgent_action == 'refund')
        {
          this.showRefundForm = 'true';
        }
        else
        {
          this.showRefundForm = 'false';
        }

      },err => {

      })

  }

  launchNotificationsFetch() {
    this.nbrOfNotificationsLoop = setInterval(() => {
    
    this.fetchNotifications();

    // clearInterval(this.nbrOfNotificationsLoop);

    }, 5000);
  }

  launchUrgentActionFetch() {
    this.nbrOfUrgentActionsLoop = setInterval(() => {
    
    this.getUrgentAction();

    // clearInterval(this.nbrOfNotificationsLoop);

    }, 5000);
  }


  viewNotifications() {

    this.navCtrl.push(HistoryPage, {
      historyType: 'notifications'
      });

  }

}
