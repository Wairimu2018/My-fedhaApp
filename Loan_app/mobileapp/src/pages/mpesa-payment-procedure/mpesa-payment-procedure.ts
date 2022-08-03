import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mpesa-payment-procedure',
  templateUrl: 'mpesa-payment-procedure.html',
})
export class MpesaPaymentProcedurePage {

  public transactionCode: any;
  public paybillNumber: any;
  public transactedAmount: any;

  constructor(public navParams: NavParams) {

  	this.transactionCode = this.navParams.get('theTransactionCode');
  	this.paybillNumber = this.navParams.get('thePaybillNumber');
  	this.transactedAmount = this.navParams.get('theTransactedAmount');

  }

}
