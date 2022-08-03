import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2'

import { HistoryPage } from '../../pages/history/history';

@Component({
  selector: 'page-borrow',
  templateUrl: 'borrow.html',
})
export class BorrowPage {

  public apiLink: any;
  public loader: any;
  public amountToBorrowValue: any;
  public loanDescriptionValue: any;
  public showTakeLoanButton: any;
  public loanRequestData: any;
  public userAccountData: any;
  public nbrOfNotifications: any;
  public nbrOfNotificationsLoop: any;
  public numberOfUserNotificationsData: any;
  public loanTogiveOut: any;
  public loanInterest: any;
  public showLoanData: any;
  public showBorrowForm: any;
  public nbrOfUrgentActionsLoop: any;

  @ViewChild('amountToBorrow') requestedAmountToBorrow;
  @ViewChild('loanDescription') requestedLoanDescription;
  @ViewChild('numberOfIntendedDaysToRefund') intendedNumberOfDaysToRepay;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingControl: LoadingController) {
    
    this.apiLink = "https://myfedha-loanapp.herokuapp.com";

    this.showTakeLoanButton = true;
    this.showLoanData = false;

    this.getUrgentAction();
    this.getUserAccountDetails();
    this.fetchNotifications();
    this.launchUrgentActionFetch();
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

  requestForLoan() {

  	var amountToBorrow = this.requestedAmountToBorrow.value;
  	var loanDescription = this.requestedLoanDescription.value;
    var intendedNumberOfDaysToRepay = this.intendedNumberOfDaysToRepay.value;

  	if((amountToBorrow == '')||(loanDescription == ''))
  	{
  		this.showErrorMessage('Please enter the loan data!');
  	}
  	else
  	{
      this.showLoading("Sending request, please wait ...");

      var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
      var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
      var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
      var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

      this.http.get(this.apiLink+'/rest_loan_request/?intended_number_of_days_to_repay='+intendedNumberOfDaysToRepay+'&amount='+amountToBorrow+'&description='+loanDescription+'&firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

        loanRequestData => {

          this.loader.dismiss();

          if(loanRequestData[0].result == '0') {

            this.showErrorMessage(loanRequestData[0].error);
          }
          else
          {
            this.getUserAccountDetails();

            this.showTakeLoanButton = false;

            this.showSuccessMessage('Loan request sent!');
            this.amountToBorrowValue = '';
            this.loanDescriptionValue = '';

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

        if(userUrgentActionData[0].urgent_action == 'borrow')
        {
          this.showBorrowForm = 'true';
        }
        else
        {
          this.showBorrowForm = 'false';
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

  checkLoanInfo() {

    var requested_amount = this.requestedAmountToBorrow.value;

    this.http.get(this.apiLink+'/rest_check_loan_data/?amount='+requested_amount+'&format=json').subscribe(

      loanData => {        

        this.loanTogiveOut = loanData[0].loan_to_give_out;
        this.loanInterest = loanData[0].loan_interest;

        this.showLoanData = true;

        },err => {

        })

  }

}
