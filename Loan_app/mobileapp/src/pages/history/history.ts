import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2'

import { MpesaPaymentProcedurePage } from '../../pages/mpesa-payment-procedure/mpesa-payment-procedure';
import { AdminTransactionsPage } from '../../pages/admin-transactions/admin-transactions';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public historyTitle: any;
  public apiLink: any;
  public loader: any;
  public isAdmin: any;
  public depositsHistoryData: any;
  public borrowalHistoryData: any;
  public refundsHistoryData: any;
  public withdrawalsHistoryData: any;
  public showRefundSpinner: any;
  public showBorrowalSpinner: any;
  public showDepositSpinner: any;
  public showWithdrawalSpinner: any;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public loadingControl: LoadingController, private alertCtrl: AlertController) {
  
  	this.apiLink = "https://myfedha-loanapp.herokuapp.com";

  	var requestedType = this.navParams.get('historyType');
  	if(requestedType == 'notifications')
  	{
  		this.historyTitle = "Notifications";
  	}
  	else
  	{
  		this.historyTitle = "History";
  	}

    var adminCheck = window.localStorage.getItem('xUMy-Fedha15__is_admin');
    if((adminCheck == 'true')||(adminCheck == 'True'))
    {
      this.isAdmin = 'true';
    }
    else
    {
      this.isAdmin = 'false';
    }

  	this.getDepositHistory(requestedType, 'client');
  	this.getWithdrawalHistory(requestedType, 'client');
  	this.getBorrowalHistory(requestedType, 'client');
  	this.getRefundHistory(requestedType, 'client');

    this.showRefundSpinner = true;
    this.showBorrowalSpinner = true;
    this.showDepositSpinner = true;
    this.showWithdrawalSpinner = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  presentAlert(alertTitle: String, alertMsg: String) {
    let thePopup = this.alertCtrl.create({
      title: ''+alertTitle+'',
      subTitle: ''+alertMsg+'',
      buttons: ['OK']
    });
    thePopup.present();
  }

  showLoading(loadingMessage) {
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
      'Success!',
      ''+errorMessage+'',
      'error'
      )
    
  }

  getDepositHistory(historyType: String, userType: String) {

    var deposit_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var deposit_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var deposit_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var deposit_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=deposit&history_type='+historyType+'&requesting_user_type='+userType+'&firebase_id='+deposit_firebase_id+'&user_slug='+deposit_user_slug+'&current_token='+deposit_current_token+'&suggested_token='+deposit_currently_suggested_token+'&format=json').subscribe(

      depositsHistoryData => {
        
        this.showDepositSpinner = false;

        this.depositsHistoryData = depositsHistoryData;

        },err => {

        })

  }

  getWithdrawalHistory(historyType: String, userType: String) {

    var withdrawal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var withdrawal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var withdrawal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var withdrawal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=withdrawal&history_type='+historyType+'&requesting_user_type='+userType+'&firebase_id='+withdrawal_firebase_id+'&user_slug='+withdrawal_user_slug+'&current_token='+withdrawal_current_token+'&suggested_token='+withdrawal_currently_suggested_token+'&format=json').subscribe(

      withdrawalsHistoryData => {

        this.showWithdrawalSpinner = false;

        this.withdrawalsHistoryData = withdrawalsHistoryData;

        },err => {

        })

  }


getBorrowalHistory(historyType: String, userType: String) {

    var borrowal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var borrowal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var borrowal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var borrowal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=borrow&history_type='+historyType+'&requesting_user_type='+userType+'&firebase_id='+borrowal_firebase_id+'&user_slug='+borrowal_user_slug+'&current_token='+borrowal_current_token+'&suggested_token='+borrowal_currently_suggested_token+'&format=json').subscribe(

      borrowalHistoryData => {

        this.showBorrowalSpinner = false;
        this.borrowalHistoryData = borrowalHistoryData;

        },err => {

        })

  }

getRefundHistory(historyType: String, userType: String) {

    var refund_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var refund_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var refund_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var refund_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=refund&history_type='+historyType+'&requesting_user_type='+userType+'&firebase_id='+refund_firebase_id+'&user_slug='+refund_user_slug+'&current_token='+refund_current_token+'&suggested_token='+refund_currently_suggested_token+'&format=json').subscribe(

      refundsHistoryData => {        

        this.showRefundSpinner = false;

        this.refundsHistoryData = refundsHistoryData;

        },err => {

        })

  }

  viewMPesaPaymentProcedures(transactionCode: String, paybillNumber: String, transactedAmount: String) {

    this.navCtrl.push(MpesaPaymentProcedurePage, {
      theTransactionCode: transactionCode,
      thePaybillNumber: paybillNumber,
      theTransactedAmount: transactedAmount
      });

  }

  acknowledge(transactionSlug: String, transactionType: String) {

    var transaction_acknowledgement_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var transaction_acknowledgement_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var transaction_acknowledgement_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var transaction_acknowledgement_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.showLoading("Processing ...");

    this.http.get(this.apiLink+'/rest_acknowledge_transaction/?transaction_slug='+transactionSlug+'&firebase_id='+transaction_acknowledgement_firebase_id+'&user_slug='+transaction_acknowledgement_user_slug+'&current_token='+transaction_acknowledgement_current_token+'&suggested_token='+transaction_acknowledgement_currently_suggested_token+'&format=json').subscribe(

      transactionAcknowledgementData => {

      	this.loader.dismiss();

      	if(transactionAcknowledgementData[0].result == '0')
      	{
      		this.showErrorMessage(transactionAcknowledgementData[0].error);
      	}
      	else
      	{
      		this.showSuccessMessage(transactionAcknowledgementData[0].success);

      		var theRequestedType = this.navParams.get('historyType');

      		if(transactionType == 'deposit') {
      			this.getDepositHistory(theRequestedType, 'client');
      		}
      		else if(transactionType == 'withdrawal') {
      			this.getWithdrawalHistory(theRequestedType, 'client');
      		}
      		else if(transactionType == 'borrow') {
      			this.getBorrowalHistory(theRequestedType, 'client');
      		}
      		else if(transactionType == 'refund') {
      			this.getRefundHistory(theRequestedType, 'client');
      		}
      		else {}

      	}

        },err => {

        	this.loader.dismiss();

        })

  }

  viewAdminTransactions() {

    this.navCtrl.push(AdminTransactionsPage);

  }

}
