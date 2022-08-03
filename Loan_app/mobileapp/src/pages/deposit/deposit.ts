import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
// import { AnimationService, AnimationBuilder } from 'css-animator';
import Swal from 'sweetalert2'

import { HistoryPage } from '../../pages/history/history';

@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  public apiLink: any;
  public loader: any;
  public productsData: any;
  // private animator: AnimationBuilder;
  public showDepositSteps: any;
  public showSaveMoney: any;
  public amountToDepositValue: any;  
  public userAccountData: any;
  public makeDepositData: any;
  public nbrOfNotifications: any;
  public nbrOfNotificationsLoop: any;
  public userSavingsAccountsData: any;
  public numberOfUserNotificationsData: any;

  @ViewChild('depositStepsElement') depositStepsEl;

  @ViewChild('mpesaNumber') userMPesaNumber;
  @ViewChild('amountToDeposit') requestedDepositAmount;
  @ViewChild('selectedSavingAccount') saveInAccountSlug;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingControl: LoadingController) { // , animationService: AnimationService
  
  	this.apiLink = "https://myfedha-loanapp.herokuapp.com";

    // this.animator = animationService.builder();

  	this.showSaveMoney = true;
  	this.showDepositSteps = false;

    this.getProductsList();
    this.getUserAccountDetails();
    this.getUserSavingsAccounts();
    this.fetchNotifications();
    this.launchNotificationsFetch();
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

  getUserSavingsAccounts() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_user_accounts_list/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&account_type=savings&format=json').subscribe(

      userSavingsAccountsData => {

        this.userSavingsAccountsData = userSavingsAccountsData;

        },err => {

        })

  }

  getProductsList() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_products_list/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&except_user_products=true&account_type=savings&format=json').subscribe(

      productsData => {

        this.productsData = productsData;

        },err => {

        })

  }

  register_for_account(productSlug: string) {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_register_user_for_products/?product_slug='+productSlug+'&firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      userRegistrationForProductData => {

        if(userRegistrationForProductData[0].result == '1')
        {
          this.getProductsList();
          this.getUserSavingsAccounts();
          this.showSuccessMessage(userRegistrationForProductData[0].success);
        }
        else
        {
          this.showErrorMessage(userRegistrationForProductData[0].error);
        }        

        },err => {

        })

  }

  save() {

    var mpesaNumber = this.userMPesaNumber.value;
    var saveInAccountSlug = this.saveInAccountSlug.value;
    var amountToDeposit = this.requestedDepositAmount.value;

    if((mpesaNumber == '')||(saveInAccountSlug == '')||(amountToDeposit == ''))
    {
      this.showErrorMessage('Please fill in all the fields to proceed!');
    }
    else
    {
      this.showLoading("Sending request, please wait ...");

      var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
      var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
      var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
      var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

      this.http.get(this.apiLink+'/rest_make_deposit/?mpesa_number='+mpesaNumber+'&save_in_account_slug='+saveInAccountSlug+'&amount='+amountToDeposit+'&firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

        makeDepositData => {

          this.loader.dismiss();

          if(makeDepositData[0].result == '0') {

            this.showErrorMessage(makeDepositData[0].error);
          }
          else
          {
            this.getUserAccountDetails();
            this.getUserSavingsAccounts();           

            this.showSuccessMessage(makeDepositData[0].success);

            this.makeDepositData = makeDepositData;

            this.showDepositSteps = true;
            // this.animator.setType('flipInX').show(this.depositStepsEl.nativeElement);
            this.showSaveMoney = false;
            this.amountToDepositValue = '';
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
