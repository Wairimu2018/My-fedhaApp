import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import Swal from 'sweetalert2'

import { SearchTransactionPage } from '../../pages/search-transaction/search-transaction';

@Component({
  selector: 'page-admin-transactions',
  templateUrl: 'admin-transactions.html',
})
export class AdminTransactionsPage {

  public apiLink: any;
  public loader: any;
  public transactionTitle: any;
  public depositsHistoryData: any;
  public borrowalHistoryData: any;
  public refundsHistoryData: any;
  public withdrawalsHistoryData: any;
  public transactionVerificationData: any;
  public showAdminRefundSpinner: any;
  public showAdminBorrowalSpinner: any;
  public showAdminDepositSpinner: any;
  public showvWithdrawalSpinner: any;

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public loadingControl: LoadingController, private alertCtrl: AlertController, public popoverCtrl: PopoverController) {
  
  	this.apiLink = "https://myfedha-loanapp.herokuapp.com";

    this.transactionTitle = 'Pending Transactions';

  	this.getDepositHistory('normal', 'notifications', 'admin', '', '', '');
  	this.getWithdrawalHistory('normal', 'notifications', 'admin', '', '', '');
  	this.getBorrowalHistory('normal', 'notifications', 'admin', '', '', '');
  	this.getRefundHistory('normal', 'notifications', 'admin', '', '', '');

    this.showAdminRefundSpinner = true;
    this.showAdminBorrowalSpinner = true;
    this.showAdminDepositSpinner = true;
    this.showvWithdrawalSpinner = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTransactionsPage');
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
      'Error!',
      ''+errorMessage+'',
      'error'
      )
    
  }

  getDepositHistory(requestedFrom: String, historyType: String, userType: String, transactionFromDate: String, transactionToDate: String, transactionCustomSearch: String) {

    var deposit_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var deposit_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var deposit_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var deposit_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=deposit&history_type='+historyType+'&transaction_from_date='+transactionFromDate+'&transaction_to_date='+transactionToDate+'&custom_search='+transactionCustomSearch+'&requesting_user_type='+userType+'&firebase_id='+deposit_firebase_id+'&user_slug='+deposit_user_slug+'&current_token='+deposit_current_token+'&suggested_token='+deposit_currently_suggested_token+'&format=json').subscribe(

      depositsHistoryData => {

        this.showAdminDepositSpinner = false;

        this.depositsHistoryData = depositsHistoryData;

        },err => {

        })

  }

  getWithdrawalHistory(requestedFrom: String, historyType: String, userType: String, transactionFromDate: String, transactionToDate: String, transactionCustomSearch: String) {

    var withdrawal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var withdrawal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var withdrawal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var withdrawal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=withdrawal&history_type='+historyType+'&transaction_from_date='+transactionFromDate+'&transaction_to_date='+transactionToDate+'&custom_search='+transactionCustomSearch+'&requesting_user_type='+userType+'&firebase_id='+withdrawal_firebase_id+'&user_slug='+withdrawal_user_slug+'&current_token='+withdrawal_current_token+'&suggested_token='+withdrawal_currently_suggested_token+'&format=json').subscribe(

      withdrawalsHistoryData => {

        this.showvWithdrawalSpinner = false;

        this.withdrawalsHistoryData = withdrawalsHistoryData;

        },err => {

        })

  }


getBorrowalHistory(requestedFrom: String, historyType: String, userType: String, transactionFromDate: String, transactionToDate: String, transactionCustomSearch: String) {

    var borrowal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var borrowal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var borrowal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var borrowal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=borrow&history_type='+historyType+'&transaction_from_date='+transactionFromDate+'&transaction_to_date='+transactionToDate+'&custom_search='+transactionCustomSearch+'&requesting_user_type='+userType+'&firebase_id='+borrowal_firebase_id+'&user_slug='+borrowal_user_slug+'&current_token='+borrowal_current_token+'&suggested_token='+borrowal_currently_suggested_token+'&format=json').subscribe(

      borrowalHistoryData => {

        this.showAdminBorrowalSpinner = false;    

        this.borrowalHistoryData = borrowalHistoryData;

        },err => {

        })

  }

getRefundHistory(requestedFrom: String, historyType: String, userType: String, transactionFromDate: String, transactionToDate: String, transactionCustomSearch: String) {

    var refund_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var refund_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var refund_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var refund_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_transactions_history/?transaction_type=refund&history_type='+historyType+'&transaction_from_date='+transactionFromDate+'&transaction_to_date='+transactionToDate+'&custom_search='+transactionCustomSearch+'&requesting_user_type='+userType+'&firebase_id='+refund_firebase_id+'&user_slug='+refund_user_slug+'&current_token='+refund_current_token+'&suggested_token='+refund_currently_suggested_token+'&format=json').subscribe(

      refundsHistoryData => {

        this.showAdminRefundSpinner = false;
        this.refundsHistoryData = refundsHistoryData;

        },err => {

        })

  }

  proceedToTransactionVerification(transactionSlug: String, transactionType: String) {

    var transaction_verification_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var transaction_verification_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var transaction_verification_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var transaction_verification_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');   

    this.showLoading("Processing ...");

    this.http.get(this.apiLink+'/rest_verify_transactions/?transaction_type='+transactionType+'&transaction_slug='+transactionSlug+'&firebase_id='+transaction_verification_firebase_id+'&user_slug='+transaction_verification_user_slug+'&current_token='+transaction_verification_current_token+'&suggested_token='+transaction_verification_currently_suggested_token+'&format=json').subscribe(

      transactionVerificationData => {

        this.loader.dismiss();

        if(transactionVerificationData[0].result == '0')
        {
          this.showErrorMessage(transactionVerificationData[0].error);
        }
        else
        {
          this.showSuccessMessage(transactionVerificationData[0].success);

          if(transactionType == 'deposit') {
            this.getDepositHistory('normal', 'notifications', 'admin', '', '', '');
          }
          else if(transactionType == 'withdrawal') {
            this.getWithdrawalHistory('normal', 'notifications', 'admin', '', '', '');
          }
          else if(transactionType == 'borrow') {
            this.getBorrowalHistory('normal', 'notifications', 'admin', '', '', '');
          }
          else if(transactionType == 'refund') {
            this.getRefundHistory('normal', 'notifications', 'admin', '', '', '');
          }
          else if(transactionType == 'reject') {
            this.getDepositHistory('normal', 'notifications', 'admin', '', '', '');
            this.getWithdrawalHistory('normal', 'notifications', 'admin', '', '', '');
            this.getBorrowalHistory('normal', 'notifications', 'admin', '', '', '');
            this.getRefundHistory('normal', 'notifications', 'admin', '', '', '');
          }

          else {}

        }

        },err => {

          this.loader.dismiss();

        })

  }

  transactionVerified(transactionSlug: String, transactionCode: String, transactionType: String) { 

    var confirmMessage = '';

    if(transactionType == 'deposit') {
      confirmMessage = 'Have you received the deposit with the code '+transactionCode+' ?';
    }
    else if(transactionType == 'withdrawal') {
      confirmMessage = 'Have you sent the requested fund to the client for the withdrawal with the code '+transactionCode+' ?';
    }
    else if(transactionType == 'borrow') {
      confirmMessage = 'Have you sent the requested fund to the client for the loan with the code '+transactionCode+' ?';
    }
    else if(transactionType == 'refund') {
      confirmMessage = 'Have you received the refund with the code '+transactionCode+' ?';
    }
    else if(transactionType == 'reject') {
      confirmMessage = 'Do you want to reject the transaction with the code '+transactionCode+' ?';
    }
    else {
      confirmMessage = '';
    }

    Swal.fire({
      title: 'Confirm',
      text: confirmMessage,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          this.proceedToTransactionVerification(transactionSlug, transactionType)

          } else if (result.dismiss === Swal.DismissReason.cancel) {

            /* Swal.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            ) */

          }
        })

  }

  searchTransaction(myEvent) {
    let popover = this.popoverCtrl.create(SearchTransactionPage);

    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(searchData => {

      var emptyStatus = true;
      var emptyTransactionFromDate = true;
      var emptyTransactionToDate = true;
      var emptyTransactionCustomSearch = true;

      if(searchData != null)
      {
        var transactionStatus = searchData.transactionStatus;
        var transactionFromDate = searchData.transactionFromDate;
        var transactionToDate = searchData.transactionToDate;
        var transactionCustomSearch = searchData.transactionCustomSearch;

        if((transactionStatus == null)||(transactionStatus == undefined)||(transactionStatus == ''))
        {
          emptyStatus = false;
        }
        else
        {
          emptyStatus = true;
        }

        if((transactionFromDate == null)||(transactionFromDate == undefined)||(transactionFromDate == ''))
        {
          emptyTransactionFromDate = false;
        }
        else
        {
          emptyTransactionFromDate = true;
        }

        if((transactionToDate == null)||(transactionToDate == undefined)||(transactionToDate == ''))
        {
          emptyTransactionToDate = false;
        }
        else
        {
          emptyTransactionToDate = true;
        }

        if((transactionCustomSearch == null)||(transactionCustomSearch == undefined)||(transactionCustomSearch == ''))
        {
          emptyTransactionCustomSearch = false;
        }
        else
        {
          emptyTransactionCustomSearch = true;
        }

        if((emptyStatus==true)&&(emptyTransactionFromDate==true)&&(emptyTransactionToDate==true)&&(emptyTransactionCustomSearch==true))
        {
          
        }
        else
        {
          this.showLoading("Searching ...");

          this.getDepositHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
          this.getWithdrawalHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
          this.getBorrowalHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
          this.getRefundHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);  

          this.loader.dismiss();

        }

      }
      
    });

  }

}
