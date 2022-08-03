import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-search-transaction',
  templateUrl: 'search-transaction.html',
})
export class SearchTransactionPage {

  public searchData: any;

  @ViewChild('status') transactionStatus;
  @ViewChild('fromDate') transactionFromDate;
  @ViewChild('toDate') transactionToDate;
  @ViewChild('customSearch') transactionCustomSearch;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTransactionPage');
  }

  sendSearchData() {

  	var theTransactionStatus = this.transactionStatus.value;
  	var theTransactionCustomSearch = this.transactionCustomSearch.value;

  	var fromYear = this.transactionFromDate.value.year;
    var fromMonth = this.transactionFromDate.value.month;
    var fromDay = this.transactionFromDate.value.day;

  	var theTransactionFromDate = fromYear+'-'+fromMonth+'-'+fromDay;

  	var toYear = this.transactionToDate.value.year;
    var toMonth = this.transactionToDate.value.month;
    var toDay = this.transactionToDate.value.day;

  	var theTransactionToDate = toYear+'-'+toMonth+'-'+toDay;

  	this.searchData = {
  		transactionStatus: theTransactionStatus,
  		transactionFromDate: theTransactionFromDate,
  		transactionToDate: theTransactionToDate,
  		transactionCustomSearch: theTransactionCustomSearch
    }

    this.viewCtrl.dismiss(this.searchData);

  }

}
