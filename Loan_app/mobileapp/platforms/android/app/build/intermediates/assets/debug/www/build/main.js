webpackJsonp([0],{

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MpesaPaymentProcedurePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MpesaPaymentProcedurePage = /** @class */ (function () {
    function MpesaPaymentProcedurePage(navParams) {
        this.navParams = navParams;
        this.transactionCode = this.navParams.get('theTransactionCode');
        this.paybillNumber = this.navParams.get('thePaybillNumber');
        this.transactedAmount = this.navParams.get('theTransactedAmount');
    }
    MpesaPaymentProcedurePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mpesa-payment-procedure',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/mpesa-payment-procedure/mpesa-payment-procedure.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>MPesa Payment Procedure</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<ion-card class="deposit-steps">\n		<div padding>\n\n			<h2>Payment Procedure</h2>\n			<br/>\n\n			<p>1. Select "Pay bill" from your Safaricom MPesa Menu.</p>\n			<p>2. Select "Enter Business Number" and enter.</p>\n			<p>3. Enter My-Fedha Business Number <b>{{paybillNumber}}</b>.</p>\n			<p>4. Select "Enter Account Number".</p>\n			<p>5. Enter the code <b>{{transactionCode}}</b>.</p>\n			<p>6. Enter Amount {{transactedAmount}}</p>\n			<p>7. Press "OK" Only when you are sure of all the sdetails You entered.</p>\n			<p>8. You will then Receive a "Confirmation Message" from MPesa.</p>\n\n		</div>\n	</ion-card>	\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/mpesa-payment-procedure/mpesa-payment-procedure.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], MpesaPaymentProcedurePage);
    return MpesaPaymentProcedurePage;
}());

//# sourceMappingURL=mpesa-payment-procedure.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BorrowPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_history_history__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BorrowPage = /** @class */ (function () {
    function BorrowPage(http, navCtrl, navParams, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        this.showTakeLoanButton = true;
        this.showLoanData = false;
        this.getUrgentAction();
        this.getUserAccountDetails();
        this.fetchNotifications();
        this.launchUrgentActionFetch();
        this.launchNotificationsFetch();
    }
    BorrowPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WithdrawPage');
    };
    BorrowPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    BorrowPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    BorrowPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    BorrowPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    BorrowPage.prototype.getUserAccountDetails = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_account_details/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userAccountData) {
            _this.userAccountData = userAccountData;
        }, function (err) {
        });
    };
    BorrowPage.prototype.requestForLoan = function () {
        var _this = this;
        var amountToBorrow = this.requestedAmountToBorrow.value;
        var loanDescription = this.requestedLoanDescription.value;
        var intendedNumberOfDaysToRepay = this.intendedNumberOfDaysToRepay.value;
        if ((amountToBorrow == '') || (loanDescription == '')) {
            this.showErrorMessage('Please enter the loan data!');
        }
        else {
            this.showLoading("Sending request, please wait ...");
            var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
            var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
            var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
            var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
            this.http.get(this.apiLink + '/rest_loan_request/?intended_number_of_days_to_repay=' + intendedNumberOfDaysToRepay + '&amount=' + amountToBorrow + '&description=' + loanDescription + '&firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (loanRequestData) {
                _this.loader.dismiss();
                if (loanRequestData[0].result == '0') {
                    _this.showErrorMessage(loanRequestData[0].error);
                }
                else {
                    _this.getUserAccountDetails();
                    _this.showTakeLoanButton = false;
                    _this.showSuccessMessage('Loan request sent!');
                    _this.amountToBorrowValue = '';
                    _this.loanDescriptionValue = '';
                }
            }, function (err) {
                _this.loader.dismiss();
            });
        }
    };
    BorrowPage.prototype.fetchNotifications = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_number_of_notifications/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (numberOfUserNotificationsData) {
            _this.nbrOfNotifications = numberOfUserNotificationsData[0].numberOfUserNotifications;
        }, function (err) {
        });
    };
    BorrowPage.prototype.getUrgentAction = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_urgent_action/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userUrgentActionData) {
            if (userUrgentActionData[0].urgent_action == 'borrow') {
                _this.showBorrowForm = 'true';
            }
            else {
                _this.showBorrowForm = 'false';
            }
        }, function (err) {
        });
    };
    BorrowPage.prototype.launchNotificationsFetch = function () {
        var _this = this;
        this.nbrOfNotificationsLoop = setInterval(function () {
            _this.fetchNotifications();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    BorrowPage.prototype.launchUrgentActionFetch = function () {
        var _this = this;
        this.nbrOfUrgentActionsLoop = setInterval(function () {
            _this.getUrgentAction();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    BorrowPage.prototype.viewNotifications = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_history_history__["a" /* HistoryPage */], {
            historyType: 'notifications'
        });
    };
    BorrowPage.prototype.checkLoanInfo = function () {
        var _this = this;
        var requested_amount = this.requestedAmountToBorrow.value;
        this.http.get(this.apiLink + '/rest_check_loan_data/?amount=' + requested_amount + '&format=json').subscribe(function (loanData) {
            _this.loanTogiveOut = loanData[0].loan_to_give_out;
            _this.loanInterest = loanData[0].loan_interest;
            _this.showLoanData = true;
        }, function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('amountToBorrow'),
        __metadata("design:type", Object)
    ], BorrowPage.prototype, "requestedAmountToBorrow", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('loanDescription'),
        __metadata("design:type", Object)
    ], BorrowPage.prototype, "requestedLoanDescription", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('numberOfIntendedDaysToRefund'),
        __metadata("design:type", Object)
    ], BorrowPage.prototype, "intendedNumberOfDaysToRepay", void 0);
    BorrowPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-borrow',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/borrow/borrow.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Borrow Money</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="viewNotifications()">        \n        <ion-icon name="notifications" class="top-bar-icons"></ion-icon>\n        <label class="top-bar-icons-labels">{{nbrOfNotifications}}</label>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<ion-card class="form-card" padding text-wrap *ngIf="showBorrowForm == \'false\'">\n		<h2 class="not-allowed">Sorry, you cannot take a loan at this moment</h2>\n	</ion-card>\n\n	<ion-card class="form-card" padding *ngIf="showBorrowForm == \'true\'">\n\n		<div *ngFor="let account of userAccountData">\n			<h2 class="borrow-limit">Limit : KES {{account.loan_limit | number}} </h2>\n			<br/>\n\n			<h2 class="pending-amount-to-borrow" *ngIf="account.user_pending_loan_requests_amount != 0">KES {{account.user_pending_loan_requests_amount | number}} pending loan request </h2>\n		</div>\n\n		<h2 class="loan-info" *ngIf="showLoanData == true" text-wrap>You will receive KES {{loanTogiveOut}}. The transaction fee is KES {{loanInterest}}</h2>\n\n		<ion-input class="amount-to-borrow-input twenty-border-radius" #amountToBorrow [ngModel]="amountToBorrowValue" type="number" placeholder="Amount to borrow" (change)="checkLoanInfo()"></ion-input>\n		<br/>\n		<ion-input class="amount-to-borrow-input twenty-border-radius" #numberOfIntendedDaysToRefund [ngModel]="numberOfIntendedDaysToRefund" type="number" placeholder="Repayment (in days)"></ion-input>\n		<br/>\n		<ion-textarea class="amount-to-borrow-input" rows="5" #loanDescription [ngModel]="loanDescriptionValue" placeholder="What do you need the loan for?"></ion-textarea>\n		<br/>\n		<button ion-button block color="secondary" class="borrow-button" (click)="requestForLoan()" *ngIf="showTakeLoanButton == true">TAKE LOAN</button>\n\n	</ion-card>\n	\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/borrow/borrow.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], BorrowPage);
    return BorrowPage;
}());

//# sourceMappingURL=borrow.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefundPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_history_history__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { AnimationService, AnimationBuilder } from 'css-animator';


var RefundPage = /** @class */ (function () {
    function RefundPage(http, navCtrl, navParams, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
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
    RefundPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DepositPage');
    };
    RefundPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    RefundPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    RefundPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    RefundPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    RefundPage.prototype.getUserAccountDetails = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_account_details/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userAccountData) {
            _this.userAccountData = userAccountData;
        }, function (err) {
        });
    };
    RefundPage.prototype.payLoan = function () {
        var _this = this;
        var amountToPay = this.suggestedAmountToPay.value;
        if (amountToPay == '') {
            this.showErrorMessage('Please enter the amount to pay!');
        }
        else {
            this.showLoading("Sending request, please wait ...");
            var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
            var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
            var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
            var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
            this.http.get(this.apiLink + '/rest_refund_loan/?amount=' + amountToPay + '&firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (loanRefundData) {
                _this.loader.dismiss();
                if (loanRefundData[0].result == '0') {
                    _this.showErrorMessage(loanRefundData[0].error);
                }
                else {
                    _this.getUserAccountDetails();
                    _this.showSuccessMessage(loanRefundData[0].success);
                    _this.loanRefundData = loanRefundData;
                    _this.showLoanPaymentSteps = true;
                    /* this.animator.setType('flipInX').show(this.loanPaymentStepsEl.nativeElement); */
                    _this.showPayLoan = false;
                    _this.amountToPayValue = '';
                }
            }, function (err) {
                _this.loader.dismiss();
            });
        }
    };
    RefundPage.prototype.fetchNotifications = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_number_of_notifications/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (numberOfUserNotificationsData) {
            _this.nbrOfNotifications = numberOfUserNotificationsData[0].numberOfUserNotifications;
        }, function (err) {
        });
    };
    RefundPage.prototype.getUrgentAction = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_urgent_action/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userUrgentActionData) {
            if (userUrgentActionData[0].urgent_action == 'refund') {
                _this.showRefundForm = 'true';
            }
            else {
                _this.showRefundForm = 'false';
            }
        }, function (err) {
        });
    };
    RefundPage.prototype.launchNotificationsFetch = function () {
        var _this = this;
        this.nbrOfNotificationsLoop = setInterval(function () {
            _this.fetchNotifications();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    RefundPage.prototype.launchUrgentActionFetch = function () {
        var _this = this;
        this.nbrOfUrgentActionsLoop = setInterval(function () {
            _this.getUrgentAction();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    RefundPage.prototype.viewNotifications = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_history_history__["a" /* HistoryPage */], {
            historyType: 'notifications'
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('loanPaymentStepsElement'),
        __metadata("design:type", Object)
    ], RefundPage.prototype, "loanPaymentStepsEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('amountToRefund'),
        __metadata("design:type", Object)
    ], RefundPage.prototype, "suggestedAmountToPay", void 0);
    RefundPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-refund',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/refund/refund.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Pay Loan</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="viewNotifications()">        \n        <ion-icon name="notifications" class="top-bar-icons"></ion-icon>\n        <label class="top-bar-icons-labels">{{nbrOfNotifications}}</label>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<ion-card class="form-card" padding text-wrap *ngIf="showRefundForm == \'false\'">\n		<h2 class="not-allowed">Sorry, you cannot take a loan at this moment</h2>\n	</ion-card>\n\n	<ion-card padding class="form-card" *ngIf="showRefundForm == \'true\'">\n\n		<div *ngFor="let account of userAccountData">\n			<h2 class="current-loan-amount">Loan : KES {{account.current_loan_amount | number}} </h2>\n			<h2 class="pending-payment-amount" *ngIf="account.user_pending_refunds_amount != 0">Pending refund : KES {{account.user_pending_refunds_amount | number}} </h2>\n		</div>\n\n		<div *ngIf="showPayLoan == true">\n			<br/>\n\n			<ion-input class="amount-to-pay-input twenty-border-radius" #amountToRefund [ngModel]="amountToPayValue" type="number" placeholder="Amount to pay"></ion-input>\n			<br/>\n			<ion-textarea class="amount-to-pay-input" rows="5" #shortMessage placeholder="Do you have a message for us?"></ion-textarea>\n			<br/>\n			<button ion-button block  class="pay-button"color="secondary" (click)="payLoan()">Pay</button>\n		</div>\n\n	</ion-card>\n	\n	<ion-card #loanPaymentStepsElement class="lon-payment-steps" *ngFor="let request of loanRefundData">\n		<div *ngIf="showLoanPaymentSteps == true" padding>\n\n			<h2>Payment Procedure</h2>\n			<br/>\n\n		    <p>1. Select "Pay bill" from your Safaricom MPesa Menu.</p>\n		    <p>2. Select "Enter Business Number" and enter.</p>\n		    <p>3. Enter My-Fedha Business Number <b>{{request.mpesa_paybill_number}}</b>.</p>\n		    <p>4. Select "Enter Account Number".</p>\n		    <p>5. Enter the code <!-- <b>{{request.transaction_code}}</b> -->.</p>\n		    <p>6. Enter Amount {{request.transacted_amount}}</p>\n		    <p>7. Press "OK" Only when you are sure of all the sdetails You entered.</p>\n		    <p>8. You will then Receive a "Confirmation Message" from MPesa.</p>\n\n		</div>\n	</ion-card>	\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/refund/refund.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], RefundPage);
    return RefundPage;
}());

//# sourceMappingURL=refund.js.map

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 214:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 214;

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepositPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_history_history__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { AnimationService, AnimationBuilder } from 'css-animator';


var DepositPage = /** @class */ (function () {
    function DepositPage(http, navCtrl, navParams, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
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
    DepositPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DepositPage');
    };
    DepositPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    DepositPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    DepositPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    DepositPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    DepositPage.prototype.getUserAccountDetails = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_account_details/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userAccountData) {
            _this.userAccountData = userAccountData;
        }, function (err) {
        });
    };
    DepositPage.prototype.getUserSavingsAccounts = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_accounts_list/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&account_type=savings&format=json').subscribe(function (userSavingsAccountsData) {
            _this.userSavingsAccountsData = userSavingsAccountsData;
        }, function (err) {
        });
    };
    DepositPage.prototype.getProductsList = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_products_list/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&except_user_products=true&account_type=savings&format=json').subscribe(function (productsData) {
            _this.productsData = productsData;
        }, function (err) {
        });
    };
    DepositPage.prototype.register_for_account = function (productSlug) {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_register_user_for_products/?product_slug=' + productSlug + '&firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userRegistrationForProductData) {
            if (userRegistrationForProductData[0].result == '1') {
                _this.getProductsList();
                _this.getUserSavingsAccounts();
                _this.showSuccessMessage(userRegistrationForProductData[0].success);
            }
            else {
                _this.showErrorMessage(userRegistrationForProductData[0].error);
            }
        }, function (err) {
        });
    };
    DepositPage.prototype.save = function () {
        var _this = this;
        var mpesaNumber = this.userMPesaNumber.value;
        var saveInAccountSlug = this.saveInAccountSlug.value;
        var amountToDeposit = this.requestedDepositAmount.value;
        if ((mpesaNumber == '') || (saveInAccountSlug == '') || (amountToDeposit == '')) {
            this.showErrorMessage('Please fill in all the fields to proceed!');
        }
        else {
            this.showLoading("Sending request, please wait ...");
            var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
            var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
            var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
            var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
            this.http.get(this.apiLink + '/rest_make_deposit/?mpesa_number=' + mpesaNumber + '&save_in_account_slug=' + saveInAccountSlug + '&amount=' + amountToDeposit + '&firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (makeDepositData) {
                _this.loader.dismiss();
                if (makeDepositData[0].result == '0') {
                    _this.showErrorMessage(makeDepositData[0].error);
                }
                else {
                    _this.getUserAccountDetails();
                    _this.getUserSavingsAccounts();
                    _this.showSuccessMessage(makeDepositData[0].success);
                    _this.makeDepositData = makeDepositData;
                    _this.showDepositSteps = true;
                    // this.animator.setType('flipInX').show(this.depositStepsEl.nativeElement);
                    _this.showSaveMoney = false;
                    _this.amountToDepositValue = '';
                }
            }, function (err) {
                _this.loader.dismiss();
            });
        }
    };
    DepositPage.prototype.fetchNotifications = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_number_of_notifications/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (numberOfUserNotificationsData) {
            _this.nbrOfNotifications = numberOfUserNotificationsData[0].numberOfUserNotifications;
        }, function (err) {
        });
    };
    DepositPage.prototype.launchNotificationsFetch = function () {
        var _this = this;
        this.nbrOfNotificationsLoop = setInterval(function () {
            _this.fetchNotifications();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    DepositPage.prototype.viewNotifications = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_history_history__["a" /* HistoryPage */], {
            historyType: 'notifications'
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('depositStepsElement'),
        __metadata("design:type", Object)
    ], DepositPage.prototype, "depositStepsEl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mpesaNumber'),
        __metadata("design:type", Object)
    ], DepositPage.prototype, "userMPesaNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('amountToDeposit'),
        __metadata("design:type", Object)
    ], DepositPage.prototype, "requestedDepositAmount", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('selectedSavingAccount'),
        __metadata("design:type", Object)
    ], DepositPage.prototype, "saveInAccountSlug", void 0);
    DepositPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-deposit',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/deposit/deposit.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Deposit</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="viewNotifications()">        \n        <ion-icon name="notifications" class="top-bar-icons"></ion-icon>\n        <label class="top-bar-icons-labels">{{nbrOfNotifications}}</label>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<ion-card class="form-card" padding>\n\n		<div *ngFor="let account of userAccountData">\n			<h2 class="current-amount-in-account">KES {{account.current_amount_in_account | number}} in account</h2>\n			<h2 class="currently-pending-amount-in-account" *ngIf="account.user_pending_deposits_amount != 0">KES {{account.user_pending_deposits_amount | number}} pending </h2>\n		</div>\n\n		<div *ngIf="showSaveMoney == true">\n			<p>Save more</p>\n			<br/>\n\n			<ion-item>\n				<ion-label class="label-name">Savings account: </ion-label>\n				<ion-select class="amount-to-dposit-input full-width" name="selectedSavingAccount" #selectedSavingAccount  required okText="Okay" cancelText="Dismiss">\n					<ion-option *ngFor="let myProduct of userSavingsAccountsData" value="{{myProduct.slug}}">{{myProduct.account_product_name}}</ion-option>\n				</ion-select>	      \n			</ion-item>\n			<br/>\n\n			<div *ngFor="let account of userAccountData">\n				<ion-item >\n					<ion-label class="label-name">M.Pesa number: </ion-label>\n					<ion-input class="amount-to-dposit-input" #mpesaNumber value="{{account.user_mpesa_number}}" type="text" placeholder="M.Pesa"></ion-input>\n				</ion-item>\n			</div>\n			<br/>\n\n			<ion-item>\n				<ion-label class="label-name">Amount to save: </ion-label>\n				<ion-input class="amount-to-dposit-input" #amountToDeposit [ngModel]="amountToDepositValue" type="number" placeholder="Amount"></ion-input>\n			</ion-item>\n			<br/>\n			<button ion-button block color="secondary" class="deposit-button" (click)="save()">Save</button>\n		</div>\n\n	</ion-card>\n	\n	<ion-card #depositStepsElement class="deposit-steps">\n		<div *ngIf="showDepositSteps == true" padding>\n			<div *ngFor="let request of makeDepositData">\n\n				<h2>Payment Procedure</h2>\n				<br/>\n\n			    <p>1. Select "Pay bill" from your Safaricom MPesa Menu.</p>\n			    <p>2. Select "Enter Business Number" and enter.</p>\n			    <p>3. Enter My-Fedha Business Number <b>{{request.mpesa_paybill_number}}</b>.</p>\n			    <p>4. Select "Enter Account Number".</p>\n			    <p>5. Enter the code <b>{{request.transaction_code}}</b>.</p>\n			    <p>6. Enter Amount <!-- {{request.transacted_amount}} --></p>\n			    <p>7. Press "OK" Only when you are sure of all the sdetails You entered.</p>\n			    <p>8. You will then Receive a "Confirmation Message" from MPesa.</p>\n\n			</div>\n		</div>\n	</ion-card>	\n	<br/>\n\n	<!-- My savings accounts -->\n\n	<div class="notifications-title">\n		<h6 class="centered">My savings accounts </h6>\n	</div>\n\n	<ion-card class="form-card" padding>\n\n		<div *ngIf="userSavingsAccountsData?.length == 0">\n			<h6 class="centered">No data found!  </h6>\n		</div>\n\n		<ion-item *ngFor="let myProduct of userSavingsAccountsData">\n			{{myProduct.account_product_name}} ( {{myProduct.account_code}} )\n			<h2 class="align-right green-color">KES {{myProduct.amount_in_account}}</h2> \n		</ion-item>\n\n	</ion-card>\n	<br/>\n\n	<!-- Add new savings accounts -->\n\n	<div class="notifications-title">\n		<h6 class="centered">Register for new savings accounts </h6>\n	</div>\n\n	<ion-card class="form-card" padding>\n\n		<div *ngIf="productsData?.length == 0">\n			<h6 class="centered">No data found!  </h6>\n		</div>\n\n		<ion-item *ngFor="let product of productsData">\n			{{product.title}}\n			<button class="green-color" ion-button clear item-end (click)="register_for_account(product.slug)">Register Now</button>\n		</ion-item>\n\n	</ion-card>\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/deposit/deposit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], DepositPage);
    return DepositPage;
}());

//# sourceMappingURL=deposit.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchTransactionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchTransactionPage = /** @class */ (function () {
    function SearchTransactionPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    SearchTransactionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchTransactionPage');
    };
    SearchTransactionPage.prototype.sendSearchData = function () {
        var theTransactionStatus = this.transactionStatus.value;
        var theTransactionCustomSearch = this.transactionCustomSearch.value;
        var fromYear = this.transactionFromDate.value.year;
        var fromMonth = this.transactionFromDate.value.month;
        var fromDay = this.transactionFromDate.value.day;
        var theTransactionFromDate = fromYear + '-' + fromMonth + '-' + fromDay;
        var toYear = this.transactionToDate.value.year;
        var toMonth = this.transactionToDate.value.month;
        var toDay = this.transactionToDate.value.day;
        var theTransactionToDate = toYear + '-' + toMonth + '-' + toDay;
        this.searchData = {
            transactionStatus: theTransactionStatus,
            transactionFromDate: theTransactionFromDate,
            transactionToDate: theTransactionToDate,
            transactionCustomSearch: theTransactionCustomSearch
        };
        this.viewCtrl.dismiss(this.searchData);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('status'),
        __metadata("design:type", Object)
    ], SearchTransactionPage.prototype, "transactionStatus", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fromDate'),
        __metadata("design:type", Object)
    ], SearchTransactionPage.prototype, "transactionFromDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('toDate'),
        __metadata("design:type", Object)
    ], SearchTransactionPage.prototype, "transactionToDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('customSearch'),
        __metadata("design:type", Object)
    ], SearchTransactionPage.prototype, "transactionCustomSearch", void 0);
    SearchTransactionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-transaction',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/search-transaction/search-transaction.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Search</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<ion-list>\n		<ion-item>\n		  <ion-label>Status</ion-label>\n		  <ion-select #status>\n		    <ion-option value="notifications">Pending</ion-option>\n		    <ion-option value="completed">Completed</ion-option>\n		  </ion-select>\n		</ion-item>\n\n		<ion-item>\n	      <ion-datetime displayFormat="DD-MMMM-YYYY" placeholder="From Date" #fromDate></ion-datetime>\n	    </ion-item>\n	    <ion-item>\n	      <ion-datetime displayFormat="DD-MMMM-YYYY" placeholder="To Date" #toDate></ion-datetime>\n	    </ion-item>\n\n		<ion-item>\n			<ion-input type="text" placeholder="Custom" #customSearch></ion-input>\n		</ion-item>\n\n    </ion-list>\n\n    <button ion-button block (click)="sendSearchData()">Search</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/search-transaction/search-transaction.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], SearchTransactionPage);
    return SearchTransactionPage;
}());

//# sourceMappingURL=search-transaction.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WithdrawPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_history_history__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WithdrawPage = /** @class */ (function () {
    function WithdrawPage(http, navCtrl, navParams, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        this.showWithdrawalButton = true;
        this.getUserAccountDetails();
        this.fetchNotifications();
        this.launchNotificationsFetch();
    }
    WithdrawPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WithdrawPage');
    };
    WithdrawPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    WithdrawPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    WithdrawPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    WithdrawPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    WithdrawPage.prototype.getUserAccountDetails = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_account_details/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userAccountData) {
            _this.userAccountData = userAccountData;
        }, function (err) {
        });
    };
    WithdrawPage.prototype.proceedToWithdraw = function () {
        var _this = this;
        var amountToWithdraw = this.requestedWithdrawalAmount.value;
        if (amountToWithdraw == '') {
            this.showErrorMessage('Please enter the amount to withdraw!');
        }
        else {
            this.showLoading("Sending request, please wait ...");
            var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
            var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
            var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
            var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
            this.http.get(this.apiLink + '/rest_request_withdrawal/?amount=' + amountToWithdraw + '&firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (withdrawalRequestData) {
                _this.loader.dismiss();
                if (withdrawalRequestData[0].result == '0') {
                    _this.showErrorMessage(withdrawalRequestData[0].error);
                }
                else {
                    _this.getUserAccountDetails();
                    _this.showWithdrawalButton = false;
                    _this.showSuccessMessage('Withdrawal request sent!');
                    _this.amountToWithdrawValue = '';
                }
            }, function (err) {
                _this.loader.dismiss();
            });
        }
    };
    WithdrawPage.prototype.fetchNotifications = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_number_of_notifications/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (numberOfUserNotificationsData) {
            _this.nbrOfNotifications = numberOfUserNotificationsData[0].numberOfUserNotifications;
        }, function (err) {
        });
    };
    WithdrawPage.prototype.launchNotificationsFetch = function () {
        var _this = this;
        this.nbrOfNotificationsLoop = setInterval(function () {
            _this.fetchNotifications();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    WithdrawPage.prototype.viewNotifications = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_history_history__["a" /* HistoryPage */], {
            historyType: 'notifications'
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('amountToWithdraw'),
        __metadata("design:type", Object)
    ], WithdrawPage.prototype, "requestedWithdrawalAmount", void 0);
    WithdrawPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-withdraw',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/withdraw/withdraw.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Withdraw</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="viewNotifications()">        \n        <ion-icon name="notifications" class="top-bar-icons"></ion-icon>\n        <label class="top-bar-icons-labels">{{nbrOfNotifications}}</label>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<ion-card padding class="form-card">\n\n    <div *ngFor="let account of userAccountData">\n      <h2 class="withdrawal-limit">Limit : KES {{account.current_amount_in_account | number}} </h2>\n      <br/>\n      <h2 class="pending-amount-to-withdraw" *ngIf="account.user_pending_withdrawal_amount != 0">KES {{account.user_pending_withdrawal_amount | number}} pending withdrawal </h2>\n		</div>\n\n		<ion-input class="amount-to-withdraw-input" #amountToWithdraw [ngModel]="amountToWithdrawValue" type="number" placeholder="Amount to withdraw"></ion-input>\n		<br/>\n		<button ion-button block color="secondary" class="withdraw-button" (click)="proceedToWithdraw()" *ngIf="showWithdrawalButton == true">Withdraw</button>\n\n	</ion-card>\n	\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/withdraw/withdraw.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], WithdrawPage);
    return WithdrawPage;
}());

//# sourceMappingURL=withdraw.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_history_history__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_help_help__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_us_about_us__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_my_profile_my_profile__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_our_policy_our_policy__ = __webpack_require__(361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.proceedToLogout = function () {
        window.localStorage.setItem('xUMy-Fedha15__isLogged', 'false');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
    };
    SettingsPage.prototype.requestLogout = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default.a.fire({
            title: 'Logout',
            text: 'Do you want to logout?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.proceedToLogout();
            }
            else if (result.dismiss === __WEBPACK_IMPORTED_MODULE_2_sweetalert2___default.a.DismissReason.cancel) {
                /* Swal(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                ) */
            }
        });
    };
    SettingsPage.prototype.viewHistory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_history_history__["a" /* HistoryPage */], {
            historyType: 'completed'
        });
    };
    SettingsPage.prototype.viewHelp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_help_help__["a" /* HelpPage */]);
    };
    SettingsPage.prototype.viewPolicy = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_our_policy_our_policy__["a" /* OurPolicyPage */]);
    };
    SettingsPage.prototype.viewAboutUs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_about_us_about_us__["a" /* AboutUsPage */]);
    };
    SettingsPage.prototype.viewProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_my_profile_my_profile__["a" /* MyProfilePage */]);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>  \n</ion-header>\n\n<ion-content>\n\n\n	<ion-card-header>\n		Account\n	</ion-card-header>\n\n	<ion-list>\n\n	    <button ion-item (click)="viewHistory()">\n	    	<!-- <ion-icon name="timer" item-start class="icons"></ion-icon> -->\n	    	<div class="float-left">\n	    	<img class="icon settings-img-items" src="assets/imgs/history_icon.png">\n	    	</div>\n	    	<div class="float-left settings-list-items">History</div>\n	    </button>\n\n	    <button ion-item (click)="viewProfile()">\n	    	<!-- <ion-icon name="timer" item-start class="icons"></ion-icon> -->\n	    	<div class="float-left">\n	    	<img class="icon settings-img-items" src="assets/imgs/profile_settings.png">\n	    	</div>\n	    	<div class="float-left settings-list-items">My Profile</div>\n	    </button>\n\n	    <button ion-item (click)="requestLogout()">\n	    	<!-- <ion-icon name="timer" item-start class="icons"></ion-icon> -->\n	    	<div class="float-left">\n	    	<img class="icon settings-img-items" src="assets/imgs/logout_settings.png">\n	    	</div>\n	    	<div class="float-left settings-list-items">Sign out</div>\n	    </button>\n\n    <ion-card-header>\n		General\n	</ion-card-header>\n\n	    <button ion-item (click)="viewPolicy()">\n	    	<!-- <ion-icon name="timer" item-start class="icons"></ion-icon> -->\n	    	<div class="float-left">\n	    	<img class="icon settings-img-items" src="assets/imgs/our_policy_settings.png">\n	    	</div>\n	    	<div class="float-left settings-list-items">Our Policy</div>\n	    </button>\n\n	    <button ion-item (click)="viewHelp()">\n	    	<!-- <ion-icon name="timer" item-start class="icons"></ion-icon> -->\n	    	<div class="float-left">\n	    	<img class="icon settings-img-items" src="assets/imgs/help_settings.png">\n	    	</div>\n	    	<div class="float-left settings-list-items">Help</div>\n	    </button>\n\n	    <button ion-item (click)="viewAboutUs()">\n	    	<!-- <ion-icon name="timer" item-start class="icons"></ion-icon> -->\n	    	<div class="float-left">\n	    	<img class="icon settings-img-items" src="assets/imgs/about_us_settings.png">\n	    	</div>\n	    	<div class="float-left settings-list-items">About Us</div>\n	    </button>\n	    \n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateUserPage = /** @class */ (function () {
    function CreateUserPage(http, navCtrl, navParams, menu, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        this.menu = menu;
        this.menu.enable(false, 'sideMenuID');
        var userStoredIDNumber = window.localStorage.getItem('xUMy-Fedha15__userStoredIDNumber');
        if ((userStoredIDNumber == null) || (userStoredIDNumber == 'null') || (userStoredIDNumber == undefined) || (userStoredIDNumber == 'undefined') || (userStoredIDNumber == '')) {
            this.storedIDNumber = '';
            this.showIDNumberIDLabel = true;
        }
        else {
            this.storedIDNumber = userStoredIDNumber;
            this.showIDNumberIDLabel = false;
        }
        var userStoredTelephone = window.localStorage.getItem('xUMy-Fedha15__userStoredTelephone');
        if ((userStoredTelephone == null) || (userStoredTelephone == 'null') || (userStoredTelephone == undefined) || (userStoredTelephone == 'undefined') || (userStoredTelephone == '')) {
            this.storedTelephone = '';
            this.showTelephoneLabel = true;
        }
        else {
            this.storedTelephone = userStoredTelephone;
            this.showTelephoneLabel = false;
        }
        var userStoredFirstName = window.localStorage.getItem('xUMy-Fedha15__userStoredFirstName');
        if ((userStoredFirstName == null) || (userStoredFirstName == 'null') || (userStoredFirstName == undefined) || (userStoredFirstName == 'undefined') || (userStoredFirstName == '')) {
            this.storedFirstName = '';
            this.showFirstNameLabel = true;
        }
        else {
            this.storedFirstName = userStoredFirstName;
            this.showFirstNameLabel = false;
        }
        var userStoredLastName = window.localStorage.getItem('xUMy-Fedha15__userStoredLastName');
        if ((userStoredLastName == null) || (userStoredLastName == 'null') || (userStoredLastName == undefined) || (userStoredLastName == 'undefined') || (userStoredLastName == '')) {
            this.storedLastName = '';
            this.showLasstNameLabel = true;
        }
        else {
            this.storedLastName = userStoredLastName;
            this.showLasstNameLabel = false;
        }
        this.showEmailLabel = true;
        this.showPasswordLabel = true;
        this.showPasswordConfirmationLabel = true;
        this.showLoginPasswordLabel = true;
        this.showLoginUsernameLabel = true;
    }
    CreateUserPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    CreateUserPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    CreateUserPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    CreateUserPage.prototype.showInformationMessage = function (information) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Info!', '' + information + '', 'info');
    };
    CreateUserPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    CreateUserPage.prototype.ionViewDidLoad = function () {
        this.prism = document.getElementById("rec-prism");
    };
    CreateUserPage.prototype.showSignup = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
    };
    CreateUserPage.prototype.showLogin = function () {
        // this.prism.style.transform = "translateZ(-100px)";
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    CreateUserPage.prototype.wipeIDNumberLabel = function () {
        this.showIDNumberIDLabel = false;
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    CreateUserPage.prototype.alterIDNumberLabel = function () {
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
    };
    CreateUserPage.prototype.wipeTelephoneLabel = function () {
        this.showTelephoneLabel = false;
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    CreateUserPage.prototype.alterTelephoneLabel = function () {
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
    };
    CreateUserPage.prototype.wipeFirstNameLabel = function () {
        this.showFirstNameLabel = false;
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    CreateUserPage.prototype.alterFirstNameLabel = function () {
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
    };
    CreateUserPage.prototype.wipeLastNameLabel = function () {
        this.showLasstNameLabel = false;
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
    };
    CreateUserPage.prototype.alterLastNameLabel = function () {
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    CreateUserPage.prototype.wipeEmailLabel = function () {
        this.showEmailLabel = false;
        var sentPassword = this.userPassword.value;
        if (sentPassword == '') {
            this.showPasswordLabel = true;
        }
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if (sentPasswordConfirmation == '') {
            this.showPasswordConfirmationLabel = true;
        }
    };
    CreateUserPage.prototype.alterEmailLabel = function () {
        var sentEmail = this.userEmail.value;
        if (sentEmail == '') {
            this.showEmailLabel = true;
        }
    };
    CreateUserPage.prototype.wipePasswordLabel = function () {
        this.showPasswordLabel = false;
        var sentEmail = this.userEmail.value;
        if (sentEmail == '') {
            this.showEmailLabel = true;
        }
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if (sentPasswordConfirmation == '') {
            this.showPasswordConfirmationLabel = true;
        }
    };
    CreateUserPage.prototype.alterPasswordLabel = function () {
        var sentPassword = this.userPassword.value;
        if (sentPassword == '') {
            this.showPasswordLabel = true;
        }
    };
    CreateUserPage.prototype.wipePasswordConfirmationLabel = function () {
        this.showPasswordConfirmationLabel = false;
        var sentEmail = this.userEmail.value;
        if (sentEmail == '') {
            this.showEmailLabel = true;
        }
        var sentPassword = this.userPassword.value;
        if (sentPassword == '') {
            this.showPasswordLabel = true;
        }
    };
    CreateUserPage.prototype.alterPasswordConfirmationLabel = function () {
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if (sentPasswordConfirmation == '') {
            this.showPasswordConfirmationLabel = true;
        }
    };
    CreateUserPage.prototype.wipeLoginUsernameLabel = function () {
        this.showLoginUsernameLabel = false;
        var receivedPassword = this.userLoginPassword.value;
        if (receivedPassword == '') {
            this.showLoginPasswordLabel = true;
        }
    };
    CreateUserPage.prototype.alterLoginUsernameLabel = function () {
        var receivedEmail = this.loginUsername.value;
        if (receivedEmail == '') {
            this.showLoginUsernameLabel = true;
        }
    };
    CreateUserPage.prototype.wipeLoginPasswordLabel = function () {
        this.showLoginPasswordLabel = false;
        var receivedEmail = this.loginUsername.value;
        if (receivedEmail == '') {
            this.showLoginUsernameLabel = true;
        }
    };
    CreateUserPage.prototype.alterLoginPasswordLabel = function () {
        var receivedPassword = this.userLoginPassword.value;
        if (receivedPassword == '') {
            this.showLoginPasswordLabel = true;
        }
    };
    CreateUserPage.prototype.showNextSignupPage = function () {
        var idNumber = this.userIDNumber.value;
        var tel = this.userTelephone.value;
        var firstName = this.userFirstName.value;
        var lastName = this.userLarstName.value;
        if ((idNumber == '') || (tel == '') || (firstName == '') || (lastName == '')) {
            this.showErrorMessage("Please supply the whole data to proceed!");
        }
        else {
            window.localStorage.setItem('xUMy-Fedha15__userStoredIDNumber', idNumber);
            window.localStorage.setItem('xUMy-Fedha15__userStoredTelephone', tel);
            window.localStorage.setItem('xUMy-Fedha15__userStoredFirstName', firstName);
            window.localStorage.setItem('xUMy-Fedha15__userStoredLastName', lastName);
            // this.prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
        }
    };
    CreateUserPage.prototype.showForgotPassword = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
    };
    CreateUserPage.prototype.showContactUs = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
    };
    CreateUserPage.prototype.showThankYou = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
    };
    CreateUserPage.prototype.testCreateAccount = function () {
        //var sentTel = this.userTelephone.value;
        //var sentIdNumber = this.userIDNumber.value;
        var sentFirstName = this.userFirstName.value;
        var sentLastName = this.userLarstName.value;
        var sentEmail = this.userEmail.value.toLowerCase();
        //var sentPassword = this.userPassword.value; 
        //var sentPasswordConfirmation = this.confirmedPassword.value;
        window.localStorage.setItem('xUMy-Fedha15__firebase_id', 'firebase');
        window.localStorage.setItem('xUMy-Fedha15__user_slug', sentFirstName);
        window.localStorage.setItem('xUMy-Fedha15__verified', 'true');
        window.localStorage.setItem('xUMy-Fedha15__email_address', sentEmail);
        window.localStorage.setItem('xUMy-Fedha15__first_name', sentFirstName);
        window.localStorage.setItem('xUMy-Fedha15__middle_name', '');
        window.localStorage.setItem('xUMy-Fedha15__last_name', sentLastName);
        window.localStorage.setItem('xUMy-Fedha15__profile_image_url', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredIDNumber', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredTelephone', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredFirstName', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredLastName', '');
        this.showSuccessMessage("Account created!");
        this.showLogin();
    };
    CreateUserPage.prototype.testLogin = function () {
        //var receivedEmail = this.loginUsername.value.toLowerCase();
        //var receivedPassword = this.userLoginPassword.value;
        window.localStorage.setItem('xUMy-Fedha15__isLogged', 'true');
        window.localStorage.setItem('xUMy-Fedha15__active_login_token', 'hjh5454');
        this.showSuccessMessage("Login successful");
        var theHomePage = { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] };
        this.navCtrl.setRoot(theHomePage.component);
    };
    CreateUserPage.prototype.testSignupUser = function () {
        var _this = this;
        var userTestSignupEmail = this.userEmail.value.toLowerCase();
        var userTestSignupPassword = this.userPassword.value;
        if ((userTestSignupEmail != '') && (userTestSignupPassword != '')) {
            this.showLoading("Account configuration ...");
            this.http.get(this.apiLink + '/rest_test_login_user/?email=' + userTestSignupEmail + '&password=' + userTestSignupPassword + '&format=json').subscribe(function (userTestData) {
                if (userTestData != '') {
                    if ((userTestData[0].user_firebase_id == 'none') && (userTestData[0].result == '1')) {
                        // this.updateuserRecordInFirebase(userTestSignupEmail, userTestSignupPassword);
                        _this.userExistsAndShouldLogin = 'true';
                        _this.loader.dismiss();
                    }
                    else {
                        _this.loader.dismiss();
                    }
                }
                else {
                    _this.loader.dismiss();
                }
            });
        }
    };
    CreateUserPage.prototype.createDjangoUser = function (firebaseID) {
        var _this = this;
        var sentTel = this.userTelephone.value;
        var sentIdNumber = this.userIDNumber.value;
        var sentFirstName = this.userFirstName.value;
        var sentLastName = this.userLarstName.value;
        var sentEmail = this.userEmail.value.toLowerCase();
        var sentPassword = this.userPassword.value;
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if ((sentTel == '') || (sentIdNumber == '') || (sentFirstName == '') || (sentLastName == '') || (sentEmail == '') || (sentPassword == '') || (sentPasswordConfirmation == '')) {
            this.showErrorMessage("Please supply the whole data to proceed!");
        }
        else {
            if (sentPassword != sentPasswordConfirmation) {
                this.showErrorMessage("The two passwords don't match. Please check your password and try again!");
            }
            else {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (sentEmail.match(mailformat)) {
                    this.showLoading("Creating account ...");
                    this.http.get(this.apiLink + '/rest_user_registration/?firebase_id=' + firebaseID + '&id_number=' + sentIdNumber + '&first_name=' + sentFirstName + '&last_name=' + sentLastName + '&email=' + sentEmail + '&tel=' + sentTel + '&password=' + sentPassword + '&password_confirmation=' + sentPasswordConfirmation + '&format=json').subscribe(function (newAccountData) {
                        _this.loader.dismiss();
                        if (newAccountData != '') {
                            if (newAccountData[0].result == '1') {
                                //window.localStorage.setItem('xUMy-Fedha15__isLogged', 'true');
                                window.localStorage.setItem('xUMy-Fedha15__firebase_id', newAccountData[0].firebase_id);
                                window.localStorage.setItem('xUMy-Fedha15__user_slug', newAccountData[0].user_slug);
                                window.localStorage.setItem('xUMy-Fedha15__verified', newAccountData[0].verified);
                                window.localStorage.setItem('xUMy-Fedha15__email_address', newAccountData[0].email_address);
                                window.localStorage.setItem('xUMy-Fedha15__first_name', newAccountData[0].first_name);
                                window.localStorage.setItem('xUMy-Fedha15__middle_name', newAccountData[0].middle_name);
                                window.localStorage.setItem('xUMy-Fedha15__last_name', newAccountData[0].last_name);
                                window.localStorage.setItem('xUMy-Fedha15__profile_image_url', newAccountData[0].profile_image_url);
                                window.localStorage.setItem('xUMy-Fedha15__userStoredIDNumber', '');
                                window.localStorage.setItem('xUMy-Fedha15__userStoredTelephone', '');
                                window.localStorage.setItem('xUMy-Fedha15__userStoredFirstName', '');
                                window.localStorage.setItem('xUMy-Fedha15__userStoredLastName', '');
                                _this.showSuccessMessage(newAccountData[0].success);
                                _this.showLogin();
                            }
                            else {
                                _this.showErrorMessage(newAccountData[0].error);
                            }
                        }
                        else {
                            _this.showErrorMessage("Server error! Please try again");
                        }
                    }, function (err) {
                        _this.loader.dismiss();
                    });
                }
                else {
                    this.showErrorMessage("You have entered an invalid email address!");
                }
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('idNumber'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userIDNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('telephone'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userTelephone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('firstName'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userFirstName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lastName'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userLarstName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('email'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userEmail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userPassword", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('passwordConfirmation'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "confirmedPassword", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "loginUsername", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('loginPassword'),
        __metadata("design:type", Object)
    ], CreateUserPage.prototype, "userLoginPassword", void 0);
    CreateUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-user',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/create-user/create-user.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	\n	<!-- <h3 class="form-title">Reservation</h3>\n -->\n	<div class="form">\n	<br/>\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="person"></ion-icon> &nbsp; First Name :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="text" placeholder="eg: Mark" name="firstName" #firstName required></ion-input>\n		</div>\n		<br/>\n\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="person"></ion-icon> &nbsp; Last Name :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="text" placeholder="eg: Hailey" name="lastName" #lastName required></ion-input>\n		</div>\n		<br/>\n\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="person"></ion-icon> &nbsp; ID Number :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="text" placeholder="eg: 1010101" name="idNumber" #idNumber required></ion-input>\n		</div>\n		<br/>\n\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="call"></ion-icon> &nbsp; Telephone :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="tel" placeholder="eg: 0702121212" name="telephone" #telephone required></ion-input>\n		</div>\n		<br/>\n\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="mail"></ion-icon> &nbsp; Email Address :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="email" placeholder="eg: marcus@hailey.com" name="email" #email required></ion-input>\n		</div>\n		<br/>\n\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="lock"></ion-icon> &nbsp; Password :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="password" placeholder=" *********** " name="password" #password required></ion-input>\n		</div>\n		<br/>\n\n		<div class="form-left">\n			<label><ion-icon class="form-icons" name="lock"></ion-icon> &nbsp; Confirm Password :</label>\n\n			<ion-input class="inputs twenty-border-radius" type="password" placeholder=" *********** " name="passwordConfirmation" #passwordConfirmation required></ion-input>\n		</div>\n		<br/>\n\n		<button class="reserve-button" ion-button full (click)="createDjangoUser(\'default\')"> <ion-icon name="log-in"></ion-icon> &nbsp;&nbsp; REGISTER </button>		<!-- createDjangoUser(\'ISVaVrzuILUePk4dWRmZ6k7JRPi1\') createFirebaseUser() -->\n\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/create-user/create-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], CreateUserPage);
    return CreateUserPage;
}());

//# sourceMappingURL=create-user.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HelpPage = /** @class */ (function () {
    function HelpPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    HelpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpPage');
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/help/help.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Help</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<ion-list>\n		<!-- <ion-item>\n			<h2 class="help-title">How to make deposit?</h2>\n			<ol class="help-list">\n				<li>Go to Deposit</li>\n				<li>Enter the amount to deposit</li>\n				<li>Submit the request to get payment instructions</li>\n				<li>Go to mpesa and send the required amount following the provided instruction</li>\n			</ol>\n		</ion-item>\n\n		<ion-item>\n			<h2 class="help-title">How to make withdraw?</h2>\n			<ol class="help-list">\n				<li>Go to Withdraw</li>\n				<li>Enter the amount to withdraw</li>\n				<li>Submit the request</li>\n				<li>Once approved, the required amount will be sent to you via mpesa</li>\n			</ol>\n		</ion-item> -->\n\n		<ion-item>\n			<h2 class="help-title">How to take loan?</h2>\n			<ol class="help-list">\n				<li>Go to Borrow</li>\n				<li>Enter the loan details</li>\n				<li>Submit the request</li>\n				<li>Once approved, the required amount will be sent to you via mpesa</li>\n			</ol>\n		</ion-item>\n\n		<ion-item>\n			<h2 class="help-title">How to pay back a loan?</h2>\n			<ol class="help-list">\n				<li>Go to Refund</li>\n				<li>Enter the amount to pay</li>\n				<li>Submit the request to get payment instructions</li>\n				<li>Go to mpesa and send the required amount following the provided instruction</li>\n			</ol>\n		</ion-item>\n\n	</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/help/help.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutUsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutUsPage = /** @class */ (function () {
    function AboutUsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutUsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutUsPage');
    };
    AboutUsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about-us',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/about-us/about-us.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>About Us</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n	<div class="company-name">\n		My-Fedha\n	</div>\n	<br/>\n\n	<div class="company-logo">\n		<img src="assets/imgs/logo.png">\n	</div>\n\n	<p text-wrap padding class="company-details">\n		My-Fedha was established to act as a means of providing affordable credit to people in Kenya. <a>Learn more ...</a>\n	</p>\n\n</ion-content>\n\n<ion-footer>\n	<ion-grid class="button-group">\n	  <ion-row>\n	    <ion-col>\n	      <button ion-button block color="primary" class="facebook-button"> <img src="assets/imgs/facebook-logo.png"> </button>\n	    </ion-col>\n	    <ion-col>\n	      <button ion-button block color="secondary" class="twitter-button"> <img src="assets/imgs/twitter.png"> </button>\n	    </ion-col>\n	    <ion-col>\n	      <button ion-button block color="danger" class="email-button"> <img src="assets/imgs/opened-email-envelope.png"> </button>\n	    </ion-col>\n	  </ion-row>\n	</ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/about-us/about-us.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AboutUsPage);
    return AboutUsPage;
}());

//# sourceMappingURL=about-us.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyProfilePage = /** @class */ (function () {
    function MyProfilePage(http, navCtrl, navParams, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
        this.apiLink = "https://myfedha.herokuapp.com";
        this.viewUserDetails();
    }
    MyProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyProfilePage');
    };
    MyProfilePage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    MyProfilePage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    MyProfilePage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    MyProfilePage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    MyProfilePage.prototype.viewUserDetails = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_user_details/?user_to_view_slug=' + user_slug + '&firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userData) {
            _this.userData = userData;
        }, function (err) {
        });
    };
    MyProfilePage.prototype.updatePassword = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('loginPassword'),
        __metadata("design:type", Object)
    ], MyProfilePage.prototype, "userLoginPassword", void 0);
    MyProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-profile',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/my-profile/my-profile.html"*/'<ion-header>	\n\n  <ion-navbar>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n	<div *ngFor="let data of userData">\n\n		<div class="top-background">		\n		</div>\n\n		<div class="top-image">\n\n			<div class="logo" *ngIf="data.profile_image_url">\n				<img src="{{data.profile_image_url}}">\n			</div>\n\n			<div class="logo" *ngIf="!data.profile_image_url">\n				<img src="assets/imgs/user.png">\n			</div>\n\n		</div>\n\n		<div class="edit-profile">\n				<ion-icon name="create"></ion-icon>\n			</div>\n\n		<h2 class="fullname">{{data.first_name}} {{data.middle_name}} {{data.last_name}}</h2>\n\n\n\n		<ion-card class="form-card">\n\n			<ion-grid>			  \n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>ID Number :</ion-col>\n			    <ion-col col-8>{{data.id_number}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</ion-col>\n			    <ion-col col-8>{{data.email}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Tel Line 1 &nbsp; :</ion-col>\n			    <ion-col col-8>{{data.tel1}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Tel Line 2 &nbsp; :</ion-col>\n			    <ion-col col-8>{{data.tel2}}</ion-col>\n			  </ion-row>			  \n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Address &nbsp;&nbsp;&nbsp;&nbsp; :</ion-col>\n			    <ion-col col-8>{{data.address}}, {{data.town}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Profession&nbsp;:</ion-col>\n			    <ion-col col-8>{{data.profession}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			    <ion-col class="particulars-name" col-4>Birthday &nbsp;&nbsp;&nbsp;&nbsp;:</ion-col>\n			    <ion-col col-8>{{data.dob | date}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Account Verified &nbsp;&nbsp;&nbsp;&nbsp; :</ion-col>\n			    <ion-col col-8 class="error-message" *ngIf="data.account_verified == false">No</ion-col>\n			    <ion-col col-8 class="success-message" *ngIf="data.account_verified == true">Verified on {{data.account_verified_on_date_time | date}} {{data.account_verified_on_date_time | date:\'shortTime\'}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Cleared for loan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</ion-col>\n			    <ion-col col-8 class="error-message" *ngIf="data.cleared_for_loan == false">No</ion-col>\n			    <ion-col col-8 class="success-message" *ngIf="data.cleared_for_loan == true">Cleared on {{data.cleared_for_loan_on_date_time | date}} {{data.cleared_for_loan_on_date_time | date:\'shortTime\'}}</ion-col>\n			  </ion-row>\n\n			  <ion-row>\n			  	<ion-col class="particulars-name" col-4>Joined On &nbsp;:</ion-col>\n			    <ion-col col-8>{{data.added_on_date | date}} {{data.added_on_date | date:\'shortTime\'}}</ion-col>\n			  </ion-row>\n\n			</ion-grid>\n\n		</ion-card>\n\n		<ion-card class="form-card">\n\n			<div class="form-title">\n				Change password\n			</div>\n			<br/>\n\n			<ion-item>\n				<ion-input name="country" #oldPassword placeholder="Old password"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input name="country" #newPassword placeholder="New password"></ion-input>\n			</ion-item>\n			<ion-item>\n				<ion-input name="country" #confirmNewPassword placeholder="Confirm password"></ion-input>\n			</ion-item>\n			<br/><br/><br/>\n\n			<button ion-button class="login-button" type="submit" (click)="updatePassword()">CONFIGURE</button>\n\n		</ion-card>\n\n	</div>\n\n	\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/my-profile/my-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], MyProfilePage);
    return MyProfilePage;
}());

//# sourceMappingURL=my-profile.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OurPolicyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OurPolicyPage = /** @class */ (function () {
    function OurPolicyPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OurPolicyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OurPolicyPage');
    };
    OurPolicyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-our-policy',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/our-policy/our-policy.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Our Policy</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n	<ion-item padding text-wrap class="centered">\n		<p>We are updating our policy. Please visit soon.</p>\n	</ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/our-policy/our-policy.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], OurPolicyPage);
    return OurPolicyPage;
}());

//# sourceMappingURL=our-policy.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PendingActivitiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_mpesa_payment_procedure_mpesa_payment_procedure__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_admin_transactions_admin_transactions__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PendingActivitiesPage = /** @class */ (function () {
    function PendingActivitiesPage(http, navCtrl, navParams, loadingControl, alertCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingControl = loadingControl;
        this.alertCtrl = alertCtrl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        var adminCheck = window.localStorage.getItem('xUMy-Fedha15__is_admin');
        if ((adminCheck == 'true') || (adminCheck == 'True')) {
            this.isAdmin = 'true';
        }
        else {
            this.isAdmin = 'false';
        }
        this.getDepositHistory('pending', 'client');
        this.getWithdrawalHistory('pending', 'client');
        this.getBorrowalHistory('pending', 'client');
        this.getRefundHistory('pending', 'client');
        this.showRefundSpinner = true;
        this.showBorrowalSpinner = true;
        this.showDepositSpinner = true;
        this.showWithdrawalSpinner = true;
    }
    PendingActivitiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HistoryPage');
    };
    PendingActivitiesPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    PendingActivitiesPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    PendingActivitiesPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    PendingActivitiesPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + errorMessage + '', 'error');
    };
    PendingActivitiesPage.prototype.getDepositHistory = function (historyType, userType) {
        var _this = this;
        var deposit_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var deposit_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var deposit_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var deposit_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=deposit&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + deposit_firebase_id + '&user_slug=' + deposit_user_slug + '&current_token=' + deposit_current_token + '&suggested_token=' + deposit_currently_suggested_token + '&format=json').subscribe(function (depositsHistoryData) {
            _this.showDepositSpinner = false;
            _this.depositsHistoryData = depositsHistoryData;
        }, function (err) {
        });
    };
    PendingActivitiesPage.prototype.getWithdrawalHistory = function (historyType, userType) {
        var _this = this;
        var withdrawal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var withdrawal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var withdrawal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var withdrawal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=withdrawal&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + withdrawal_firebase_id + '&user_slug=' + withdrawal_user_slug + '&current_token=' + withdrawal_current_token + '&suggested_token=' + withdrawal_currently_suggested_token + '&format=json').subscribe(function (withdrawalsHistoryData) {
            _this.showWithdrawalSpinner = false;
            _this.withdrawalsHistoryData = withdrawalsHistoryData;
        }, function (err) {
        });
    };
    PendingActivitiesPage.prototype.getBorrowalHistory = function (historyType, userType) {
        var _this = this;
        var borrowal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var borrowal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var borrowal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var borrowal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=borrow&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + borrowal_firebase_id + '&user_slug=' + borrowal_user_slug + '&current_token=' + borrowal_current_token + '&suggested_token=' + borrowal_currently_suggested_token + '&format=json').subscribe(function (borrowalHistoryData) {
            _this.showBorrowalSpinner = false;
            _this.borrowalHistoryData = borrowalHistoryData;
        }, function (err) {
        });
    };
    PendingActivitiesPage.prototype.getRefundHistory = function (historyType, userType) {
        var _this = this;
        var refund_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var refund_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var refund_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var refund_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=refund&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + refund_firebase_id + '&user_slug=' + refund_user_slug + '&current_token=' + refund_current_token + '&suggested_token=' + refund_currently_suggested_token + '&format=json').subscribe(function (refundsHistoryData) {
            _this.showRefundSpinner = false;
            _this.refundsHistoryData = refundsHistoryData;
        }, function (err) {
        });
    };
    PendingActivitiesPage.prototype.viewMPesaPaymentProcedures = function (transactionCode, paybillNumber, transactedAmount) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_mpesa_payment_procedure_mpesa_payment_procedure__["a" /* MpesaPaymentProcedurePage */], {
            theTransactionCode: transactionCode,
            thePaybillNumber: paybillNumber,
            theTransactedAmount: transactedAmount
        });
    };
    PendingActivitiesPage.prototype.acknowledge = function (transactionSlug, transactionType) {
        var _this = this;
        var transaction_acknowledgement_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var transaction_acknowledgement_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var transaction_acknowledgement_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var transaction_acknowledgement_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.showLoading("Processing ...");
        this.http.get(this.apiLink + '/rest_acknowledge_transaction/?transaction_slug=' + transactionSlug + '&firebase_id=' + transaction_acknowledgement_firebase_id + '&user_slug=' + transaction_acknowledgement_user_slug + '&current_token=' + transaction_acknowledgement_current_token + '&suggested_token=' + transaction_acknowledgement_currently_suggested_token + '&format=json').subscribe(function (transactionAcknowledgementData) {
            _this.loader.dismiss();
            if (transactionAcknowledgementData[0].result == '0') {
                _this.showErrorMessage(transactionAcknowledgementData[0].error);
            }
            else {
                _this.showSuccessMessage(transactionAcknowledgementData[0].success);
                var theRequestedType = _this.navParams.get('historyType');
                if (transactionType == 'deposit') {
                    _this.getDepositHistory(theRequestedType, 'client');
                }
                else if (transactionType == 'withdrawal') {
                    _this.getWithdrawalHistory(theRequestedType, 'client');
                }
                else if (transactionType == 'borrow') {
                    _this.getBorrowalHistory(theRequestedType, 'client');
                }
                else if (transactionType == 'refund') {
                    _this.getRefundHistory(theRequestedType, 'client');
                }
                else { }
            }
        }, function (err) {
            _this.loader.dismiss();
        });
    };
    PendingActivitiesPage.prototype.viewAdminTransactions = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_admin_transactions_admin_transactions__["a" /* AdminTransactionsPage */]);
    };
    PendingActivitiesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pending-activities',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/pending-activities/pending-activities.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Pending Transactions</ion-title>\n    <ion-buttons *ngIf="isAdmin == \'true\'" right>\n      <button ion-button class="border-top-button" (click)="viewAdminTransactions()">        \n        Admin\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<!-- <h2 class="notifications-title">\n		Deposits\n	</h2>\n\n	<div class="notifications-title" *ngIf="depositsHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showDepositSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of depositsHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n\n		<h2 class="transacted-amount">KES {{notification.transacted_amount}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n		<button ion-button block outline color="secondary" *ngIf="notification.verified == false" (click)="viewMPesaPaymentProcedures(notification.transaction_code, notification.used_paybill_number, notification.transacted_amount)">Payment Procedure</button>\n\n		<button ion-button block outline color="primary" *ngIf="notification.verified == true && notification.notify_user == true" (click)="acknowledge(notification.slug, \'deposit\')">OK</button>\n\n	</ion-card> -->\n\n\n	<!-- <h2 class="notifications-title">\n		Withdrawal\n	</h2>\n\n	<div class="notifications-title" *ngIf="withdrawalsHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showWithdrawalSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of withdrawalsHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n		<button ion-button block outline color="primary" *ngIf="notification.verified == true && notification.notify_user == true" (click)="acknowledge(notification.slug, \'withdrawal\')">OK</button>\n\n	</ion-card> -->\n\n\n	<h2 class="notifications-title">\n		Loan Requests\n	</h2>\n\n	<div class="notifications-title" *ngIf="borrowalHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showBorrowalSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of borrowalHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n		\n	</ion-card>\n\n\n\n	<h2 class="notifications-title">\n		Loan Refunds\n	</h2>\n\n	<div class="notifications-title" *ngIf="refundsHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showRefundSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of refundsHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n	</ion-card>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/pending-activities/pending-activities.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], PendingActivitiesPage);
    return PendingActivitiesPage;
}());

//# sourceMappingURL=pending-activities.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(368);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_market__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_create_user_create_user__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_complete_profile_setup_complete_profile_setup__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_deposit_deposit__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_withdraw_withdraw__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_borrow_borrow__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_refund_refund__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_history_history__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_mpesa_payment_procedure_mpesa_payment_procedure__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_admin_transactions_admin_transactions__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_search_transaction_search_transaction__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_help_help__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_about_us_about_us__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_my_profile_my_profile__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_our_policy_our_policy__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_pending_activities_pending_activities__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_list_list__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_status_bar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_user_create_user__["a" /* CreateUserPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_complete_profile_setup_complete_profile_setup__["a" /* CompleteProfileSetupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_deposit_deposit__["a" /* DepositPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_withdraw_withdraw__["a" /* WithdrawPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_borrow_borrow__["a" /* BorrowPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_refund_refund__["a" /* RefundPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_pending_activities_pending_activities__["a" /* PendingActivitiesPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_mpesa_payment_procedure_mpesa_payment_procedure__["a" /* MpesaPaymentProcedurePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_admin_transactions_admin_transactions__["a" /* AdminTransactionsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_search_transaction_search_transaction__["a" /* SearchTransactionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_about_us_about_us__["a" /* AboutUsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_profile_my_profile__["a" /* MyProfilePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_our_policy_our_policy__["a" /* OurPolicyPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_list_list__["a" /* ListPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_user_create_user__["a" /* CreateUserPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_complete_profile_setup_complete_profile_setup__["a" /* CompleteProfileSetupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_deposit_deposit__["a" /* DepositPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_withdraw_withdraw__["a" /* WithdrawPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_borrow_borrow__["a" /* BorrowPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_refund_refund__["a" /* RefundPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_history_history__["a" /* HistoryPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_pending_activities_pending_activities__["a" /* PendingActivitiesPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_mpesa_payment_procedure_mpesa_payment_procedure__["a" /* MpesaPaymentProcedurePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_admin_transactions_admin_transactions__["a" /* AdminTransactionsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_search_transaction_search_transaction__["a" /* SearchTransactionPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_help_help__["a" /* HelpPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_about_us_about_us__["a" /* AboutUsPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_profile_my_profile__["a" /* MyProfilePage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_our_policy_our_policy__["a" /* OurPolicyPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_market__["a" /* Market */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_social_sharing__["a" /* SocialSharing */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_market__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_borrow_borrow__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_refund_refund__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_pending_activities_pending_activities__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_admin_transactions_admin_transactions__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import { DepositPage } from '../pages/deposit/deposit';
// import { WithdrawPage } from '../pages/withdraw/withdraw';






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, loadingControl, http, market) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loadingControl = loadingControl;
        this.http = http;
        this.market = market;
        this.initializeApp();
        this.apiLink = "https://myfedha-loanapp.herokuapp.com/";
        this.launchLoginTokenRenewal();
        var adminCheck = window.localStorage.getItem('xUMy-Fedha15__is_admin');
        if ((adminCheck == 'true') || (adminCheck == 'True')) {
            this.isAdmin = 'true';
        }
        else {
            this.isAdmin = 'false';
        }
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */] },
            /* { title: 'Deposit', component: DepositPage },
            { title: 'Withdraw', component: WithdrawPage }, */
            { title: 'Borrow', component: __WEBPACK_IMPORTED_MODULE_8__pages_borrow_borrow__["a" /* BorrowPage */] },
            { title: 'Refund', component: __WEBPACK_IMPORTED_MODULE_9__pages_refund_refund__["a" /* RefundPage */] },
            { title: 'Pending Transactions', component: __WEBPACK_IMPORTED_MODULE_11__pages_pending_activities_pending_activities__["a" /* PendingActivitiesPage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Administrator', component: __WEBPACK_IMPORTED_MODULE_13__pages_admin_transactions_admin_transactions__["a" /* AdminTransactionsPage */] }
        ];
        var user_first_name = window.localStorage.getItem('xUMy-Fedha15__first_name');
        var user_last_name = window.localStorage.getItem('xUMy-Fedha15__last_name');
        if ((user_first_name == null) || (user_first_name == 'null') || (user_first_name == '') || (user_first_name == undefined) || (user_first_name == 'undefined')) {
            window.localStorage.setItem('xUMy-Fedha15__user_full_name', 'empty');
        }
        else {
            var theUserFullName = user_first_name + ' ' + user_last_name;
            window.localStorage.setItem('xUMy-Fedha15__user_full_name', theUserFullName);
        }
        this.userFullName = window.localStorage.getItem('xUMy-Fedha15__user_full_name');
        var user_profile_image = window.localStorage.getItem('xUMy-Fedha15__profile_image_url');
        if ((user_profile_image == null) || (user_profile_image == 'null') || (user_profile_image == '') || (user_profile_image == undefined) || (user_profile_image == 'undefined')) {
            window.localStorage.setItem('xUMy-Fedha15__profile_image_url', 'empty');
        }
        this.userImage = window.localStorage.getItem('xUMy-Fedha15__profile_image_url');
    }
    // renew login token
    MyApp.prototype.renewToken = function () {
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_authentication/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (tokenRenewalData) {
            if (tokenRenewalData[0].result == '11') {
                window.localStorage.setItem('xUMy-Fedha15__suggested_token', tokenRenewalData[0].suggested_token);
                window.localStorage.setItem('xUMy-Fedha15__active_login_token', currently_suggested_token);
                window.localStorage.setItem('xUMy-Fedha15__is_admin', tokenRenewalData[0].is_admin);
            }
            else if (tokenRenewalData[0].result == '10') {
                window.localStorage.setItem('xUMy-Fedha15__suggested_token', tokenRenewalData[0].suggested_token);
            }
            else { }
        }, function (err) {
        });
    };
    MyApp.prototype.checkAppVersion = function () {
        var _this = this;
        var appInstalledVersion = '0.0.7';
        this.http.get(this.apiLink + '/rest_test_app_version/?format=json').subscribe(function (appVersionData) {
            if (appVersionData[0].current_version != appInstalledVersion) {
                __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default.a.fire({
                    title: 'New App update',
                    text: 'Please update your app!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, update!',
                    cancelButtonText: 'I will update later!'
                }).then(function (result) {
                    if (result.value) {
                        // window.open('http://play.google.com/store/apps/details?id=com.my-fedha.com', '_system');
                        _this.market.open('com.my-fedha.com');
                    }
                    else if (result.dismiss === __WEBPACK_IMPORTED_MODULE_6_sweetalert2___default.a.DismissReason.cancel) {
                        /*Swal(
                          'Cancelled',
                          'Your imaginary file is safe :)',
                          'error'
                        )*/
                    }
                });
            }
        }, function (err) {
        });
    };
    MyApp.prototype.launchLoginTokenRenewal = function () {
        var _this = this;
        var loginInfo = window.localStorage.getItem('xUMy-Fedha15__isLogged');
        if (loginInfo == 'true') {
            this.renewTokenLoop = setInterval(function () {
                _this.renewToken();
                // clearInterval(this.renewTokenLoop);
            }, 40000);
        }
    };
    MyApp.prototype.showLoading = function () {
        this.loader = this.loadingControl.create({
            content: "Authenticating, please wait..."
        });
        this.loader.present();
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.checkAppVersion();
            _this.showLoading();
            var loginValue = window.localStorage.getItem('xUMy-Fedha15__isLogged');
            if (loginValue == 'true') {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */];
            }
            _this.loader.dismiss();
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/app/app.html"*/'<ion-menu [content]="content">\n  <!-- <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header> -->\n\n  <ion-content class="menu-background">\n\n    <!-- <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list> -->\n\n    <div class="user-profile-data">\n\n      <img *ngIf="userImage == \'empty\'" class="profile-image2" src="assets/imgs/user.png">\n      <img *ngIf="userImage != \'empty\'" class="profile-image2" src="assets/imgs/user.png"> <!-- {{userImage}} -->\n      <br/>\n      <h4 class="profile-name2" *ngIf="userFullName == \'empty\'">Welcome To My-Fedha</h4>\n      <h4 class="profile-name2" *ngIf="userFullName != \'empty\'">{{userFullName}} </h4>\n      \n    </div>\n\n    <div class="menu-lists-names" menuClose *ngFor="let p of pages" (click)="openPage(p)">\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Home\'" item-left name="home"> &nbsp;&nbsp;&nbsp; </ion-icon>\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Deposit\'" item-left name="card"> &nbsp;&nbsp;&nbsp;</ion-icon>\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Withdraw\'" item-left name="cash"> &nbsp;&nbsp;&nbsp;</ion-icon>\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Borrow\'" item-left name="briefcase"> &nbsp;&nbsp;&nbsp;&nbsp; </ion-icon>\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Refund\'" item-left name="git-merge"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </ion-icon>\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Pending Transactions\'" name="infinite"> &nbsp;&nbsp;&nbsp;&nbsp; </ion-icon>\n      <ion-icon class="menu-icons" *ngIf="p.title==\'Settings\'" item-left name="construct"> &nbsp;&nbsp;&nbsp; </ion-icon>\n\n      <div *ngIf="p.title==\'Administrator\' && isAdmin == \'true\'">\n        <br/>\n        <hr>\n        <ion-icon class="menu-icons" item-left name="construct"> &nbsp;&nbsp;&nbsp; </ion-icon>\n        <span>Administrator</span>\n      </div>\n\n      <span *ngIf="p.title!=\'Administrator\'">{{p.title}}</span>\n    </div>\n\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_market__["a" /* Market */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_mpesa_payment_procedure_mpesa_payment_procedure__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_admin_transactions_admin_transactions__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HistoryPage = /** @class */ (function () {
    function HistoryPage(http, navCtrl, navParams, loadingControl, alertCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingControl = loadingControl;
        this.alertCtrl = alertCtrl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        var requestedType = this.navParams.get('historyType');
        if (requestedType == 'notifications') {
            this.historyTitle = "Notifications";
        }
        else {
            this.historyTitle = "History";
        }
        var adminCheck = window.localStorage.getItem('xUMy-Fedha15__is_admin');
        if ((adminCheck == 'true') || (adminCheck == 'True')) {
            this.isAdmin = 'true';
        }
        else {
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
    HistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HistoryPage');
    };
    HistoryPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    HistoryPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    HistoryPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    HistoryPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + errorMessage + '', 'error');
    };
    HistoryPage.prototype.getDepositHistory = function (historyType, userType) {
        var _this = this;
        var deposit_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var deposit_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var deposit_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var deposit_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=deposit&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + deposit_firebase_id + '&user_slug=' + deposit_user_slug + '&current_token=' + deposit_current_token + '&suggested_token=' + deposit_currently_suggested_token + '&format=json').subscribe(function (depositsHistoryData) {
            _this.showDepositSpinner = false;
            _this.depositsHistoryData = depositsHistoryData;
        }, function (err) {
        });
    };
    HistoryPage.prototype.getWithdrawalHistory = function (historyType, userType) {
        var _this = this;
        var withdrawal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var withdrawal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var withdrawal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var withdrawal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=withdrawal&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + withdrawal_firebase_id + '&user_slug=' + withdrawal_user_slug + '&current_token=' + withdrawal_current_token + '&suggested_token=' + withdrawal_currently_suggested_token + '&format=json').subscribe(function (withdrawalsHistoryData) {
            _this.showWithdrawalSpinner = false;
            _this.withdrawalsHistoryData = withdrawalsHistoryData;
        }, function (err) {
        });
    };
    HistoryPage.prototype.getBorrowalHistory = function (historyType, userType) {
        var _this = this;
        var borrowal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var borrowal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var borrowal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var borrowal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=borrow&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + borrowal_firebase_id + '&user_slug=' + borrowal_user_slug + '&current_token=' + borrowal_current_token + '&suggested_token=' + borrowal_currently_suggested_token + '&format=json').subscribe(function (borrowalHistoryData) {
            _this.showBorrowalSpinner = false;
            _this.borrowalHistoryData = borrowalHistoryData;
        }, function (err) {
        });
    };
    HistoryPage.prototype.getRefundHistory = function (historyType, userType) {
        var _this = this;
        var refund_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var refund_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var refund_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var refund_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=refund&history_type=' + historyType + '&requesting_user_type=' + userType + '&firebase_id=' + refund_firebase_id + '&user_slug=' + refund_user_slug + '&current_token=' + refund_current_token + '&suggested_token=' + refund_currently_suggested_token + '&format=json').subscribe(function (refundsHistoryData) {
            _this.showRefundSpinner = false;
            _this.refundsHistoryData = refundsHistoryData;
        }, function (err) {
        });
    };
    HistoryPage.prototype.viewMPesaPaymentProcedures = function (transactionCode, paybillNumber, transactedAmount) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_mpesa_payment_procedure_mpesa_payment_procedure__["a" /* MpesaPaymentProcedurePage */], {
            theTransactionCode: transactionCode,
            thePaybillNumber: paybillNumber,
            theTransactedAmount: transactedAmount
        });
    };
    HistoryPage.prototype.acknowledge = function (transactionSlug, transactionType) {
        var _this = this;
        var transaction_acknowledgement_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var transaction_acknowledgement_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var transaction_acknowledgement_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var transaction_acknowledgement_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.showLoading("Processing ...");
        this.http.get(this.apiLink + '/rest_acknowledge_transaction/?transaction_slug=' + transactionSlug + '&firebase_id=' + transaction_acknowledgement_firebase_id + '&user_slug=' + transaction_acknowledgement_user_slug + '&current_token=' + transaction_acknowledgement_current_token + '&suggested_token=' + transaction_acknowledgement_currently_suggested_token + '&format=json').subscribe(function (transactionAcknowledgementData) {
            _this.loader.dismiss();
            if (transactionAcknowledgementData[0].result == '0') {
                _this.showErrorMessage(transactionAcknowledgementData[0].error);
            }
            else {
                _this.showSuccessMessage(transactionAcknowledgementData[0].success);
                var theRequestedType = _this.navParams.get('historyType');
                if (transactionType == 'deposit') {
                    _this.getDepositHistory(theRequestedType, 'client');
                }
                else if (transactionType == 'withdrawal') {
                    _this.getWithdrawalHistory(theRequestedType, 'client');
                }
                else if (transactionType == 'borrow') {
                    _this.getBorrowalHistory(theRequestedType, 'client');
                }
                else if (transactionType == 'refund') {
                    _this.getRefundHistory(theRequestedType, 'client');
                }
                else { }
            }
        }, function (err) {
            _this.loader.dismiss();
        });
    };
    HistoryPage.prototype.viewAdminTransactions = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_admin_transactions_admin_transactions__["a" /* AdminTransactionsPage */]);
    };
    HistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-history',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/history/history.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{historyTitle}}</ion-title>\n\n    <ion-buttons *ngIf="isAdmin == \'true\'" right>\n      <button ion-button class="border-top-button" (click)="viewAdminTransactions()">        \n        Admin\n      </button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n	<!-- <h2 class="notifications-title">\n		Deposits\n	</h2>\n\n	<div class="notifications-title" *ngIf="depositsHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showDepositSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of depositsHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n\n		<h2 class="transacted-amount">KES {{notification.transacted_amount}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n		<button ion-button block outline color="secondary" *ngIf="notification.verified == false" (click)="viewMPesaPaymentProcedures(notification.transaction_code, notification.used_paybill_number, notification.transacted_amount)">Payment Procedure</button>\n\n		<button ion-button block outline color="primary" *ngIf="notification.verified == true && notification.notify_user == true" (click)="acknowledge(notification.slug, \'deposit\')">OK</button>\n\n	</ion-card> -->\n\n\n	<!-- <h2 class="notifications-title">\n		Withdrawal\n	</h2>\n\n	<div class="notifications-title" *ngIf="withdrawalsHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showWithdrawalSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of withdrawalsHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n		<button ion-button block outline color="primary" *ngIf="notification.verified == true && notification.notify_user == true" (click)="acknowledge(notification.slug, \'withdrawal\')">OK</button>\n\n	</ion-card> -->\n\n\n	<h2 class="notifications-title">\n		Loan Requests\n	</h2>\n\n	<div class="notifications-title" *ngIf="borrowalHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showBorrowalSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of borrowalHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n		<button ion-button block outline color="primary" *ngIf="notification.verified == true && notification.notify_user == true" (click)="acknowledge(notification.slug, \'borrow\')">OK</button>\n		\n	</ion-card>\n\n\n\n	<h2 class="notifications-title">\n		Loan Refunds\n	</h2>\n\n	<div class="notifications-title" *ngIf="refundsHistoryData?.length == 0">\n		<h6 class="centered">No data found!  </h6>\n	</div>\n\n	<div *ngIf="showRefundSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n    </div>\n\n	<ion-card class="centered" *ngFor="let notification of refundsHistoryData" padding>\n		\n		<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n		<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n		<h2>{{notification.transaction_code}}</h2>\n		\n		<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n		<br/>\n\n		<button ion-button block outline color="secondary" *ngIf="notification.verified == false" (click)="viewMPesaPaymentProcedures(notification.transaction_code, notification.used_paybill_number, notification.transacted_amount)">Payment Procedure</button>\n\n		<button ion-button block outline color="primary" *ngIf="notification.verified == true && notification.notify_user == true" (click)="acknowledge(notification.slug, \'refund\')">OK</button>\n\n	</ion-card>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/history/history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */]])
    ], HistoryPage);
    return HistoryPage;
}());

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteProfileSetupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CompleteProfileSetupPage = /** @class */ (function () {
    function CompleteProfileSetupPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CompleteProfileSetupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CompleteProfileSetupPage');
    };
    CompleteProfileSetupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-complete-profile-setup',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/complete-profile-setup/complete-profile-setup.html"*/'<!--\n  Generated template for the CompleteProfileSetupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>completeProfileSetup</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/complete-profile-setup/complete-profile-setup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], CompleteProfileSetupPage);
    return CompleteProfileSetupPage;
}());

//# sourceMappingURL=complete-profile-setup.js.map

/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_deposit_deposit__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_withdraw_withdraw__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_borrow_borrow__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_refund_refund__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_history_history__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = /** @class */ (function () {
    function HomePage(http, socialSharing, navCtrl, navParams, menu, actionSheetCtrl, loadingControl) {
        this.http = http;
        this.socialSharing = socialSharing;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.actionSheetCtrl = actionSheetCtrl;
        this.loadingControl = loadingControl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        this.getUrgentAction();
        this.fetchNotifications();
        this.launchUrgentActionFetch();
        this.launchNotificationsFetch();
        this.showSpinner = true;
        var user_first_name = window.localStorage.getItem('xUMy-Fedha15__first_name');
        var user_last_name = window.localStorage.getItem('xUMy-Fedha15__last_name');
        if ((user_first_name == null) || (user_first_name == 'null') || (user_first_name == '') || (user_first_name == undefined) || (user_first_name == 'undefined')) {
            window.localStorage.setItem('xUMy-Fedha15__user_full_name', 'empty');
        }
        else {
            var theUserFullName = user_first_name + ' ' + user_last_name;
            window.localStorage.setItem('xUMy-Fedha15__user_full_name', theUserFullName);
        }
        this.userFullName = window.localStorage.getItem('xUMy-Fedha15__user_full_name');
        var user_profile_image = window.localStorage.getItem('xUMy-Fedha15__profile_image_url');
        if ((user_profile_image == null) || (user_profile_image == 'null') || (user_profile_image == '') || (user_profile_image == undefined) || (user_profile_image == 'undefined')) {
            window.localStorage.setItem('xUMy-Fedha15__profile_image_url', 'empty');
        }
        this.userImage = window.localStorage.getItem('xUMy-Fedha15__profile_image_url');
    }
    HomePage.prototype.getUrgentAction = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_urgent_action/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (userUrgentActionData) {
            _this.showSpinner = false;
            _this.userUrgentActionData = userUrgentActionData;
        }, function (err) {
        });
    };
    HomePage.prototype.fetchNotifications = function () {
        var _this = this;
        var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_user_number_of_notifications/?firebase_id=' + firebase_id + '&user_slug=' + user_slug + '&current_token=' + current_token + '&suggested_token=' + currently_suggested_token + '&format=json').subscribe(function (numberOfUserNotificationsData) {
            _this.nbrOfNotifications = numberOfUserNotificationsData[0].numberOfUserNotifications;
        }, function (err) {
        });
    };
    HomePage.prototype.launchNotificationsFetch = function () {
        var _this = this;
        this.nbrOfNotificationsLoop = setInterval(function () {
            _this.fetchNotifications();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    HomePage.prototype.launchUrgentActionFetch = function () {
        var _this = this;
        this.nbrOfUrgentActionsLoop = setInterval(function () {
            _this.getUrgentAction();
            // clearInterval(this.nbrOfNotificationsLoop);
        }, 5000);
    };
    HomePage.prototype.viewNotifications = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__pages_history_history__["a" /* HistoryPage */], {
            historyType: 'notifications'
        });
    };
    HomePage.prototype.goToDeposit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_deposit_deposit__["a" /* DepositPage */]);
    };
    HomePage.prototype.goToWithdraw = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_withdraw_withdraw__["a" /* WithdrawPage */]);
    };
    HomePage.prototype.goToBorrow = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_borrow_borrow__["a" /* BorrowPage */]);
    };
    HomePage.prototype.goToRefund = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_refund_refund__["a" /* RefundPage */]);
    };
    HomePage.prototype.selectInvitationMethod = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Send invitation',
            buttons: [
                {
                    text: 'Destructive',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                }, {
                    text: 'Archive',
                    handler: function () {
                        console.log('Archive clicked');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    HomePage.prototype.inviteFriends = function () {
        this.socialSharing.share("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", 'My-Fedha', null)
            .then(function () {
        })
            .catch(function () {
        });
    };
    HomePage.prototype.whatsappShare = function () {
        this.socialSharing.shareViaWhatsApp("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
    };
    HomePage.prototype.twitterShare = function () {
        this.socialSharing.shareViaTwitter("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
    };
    HomePage.prototype.facebookShare = function () {
        this.socialSharing.shareViaFacebook("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
    };
    HomePage.prototype.emailShare = function () {
        this.socialSharing.shareViaEmail("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="viewNotifications()">        \n        <ion-icon name="notifications" class="top-bar-icons"></ion-icon>\n        <label class="top-bar-icons-labels">{{nbrOfNotifications}}</label>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <div class="top-background"></div>\n\n  <div class="user-profile-data">\n\n    <h4 class="user-fullname" *ngIf="userFullName == \'empty\'">Welcome To My-Fedha</h4>\n    <h4 class="user-fullname" *ngIf="userFullName != \'empty\'">{{userFullName}} </h4>\n\n    <img *ngIf="userImage == \'empty\'" class="profile-image" src="assets/imgs/user.png">\n    <img *ngIf="userImage != \'empty\'" class="profile-image" src="assets/imgs/user.png">\n\n  </div>\n\n  <div class="urgent-action-card" *ngFor="let action of userUrgentActionData" padding>\n\n    <div *ngIf="showSpinner == true" class="centered">\n      <ion-spinner name="bubbles" color="white"></ion-spinner>\n    </div>\n\n    <ion-card class="centered" padding *ngIf="action.urgent_action == \'deposit\'">\n      <p class="urgent-action-info">You have currently in your account </p>\n      <br/>\n      <h2 class="urgent-action-amount">KES {{action.current_amount_in_account | number}} </h2>\n      <br/>\n\n      <div class="border-urgent-action-button" (click)="goToDeposit()">\n        <div class="urgent-action-button">\n          <img src="assets/imgs/wallet.png">\n          <h2 class="urgent-action-button-title">Deposit</h2>\n        </div>\n      </div>\n    </ion-card>\n\n    <ion-card class="centered" padding *ngIf="action.urgent_action == \'borrow\'">\n      <p class="urgent-action-info">Your loan limit is</p>\n      <br/>\n      <h2 class="urgent-action-amount">KES {{action.loan_limit | number}} </h2>\n      <br/>\n\n      <div class="border-urgent-action-button" (click)="goToBorrow()">\n        <div class="urgent-action-button">\n          <img src="assets/imgs/loan.png">\n          <h2 class="urgent-action-button-title">Borrow</h2>\n        </div>\n      </div>\n    </ion-card>\n\n    <ion-card class="centered" padding *ngIf="action.urgent_action == \'refund\'">\n      <p class="urgent-action-info">Please refund by {{action.loan_due_date | date}}</p>\n      <br/>\n      <h2 class="urgent-action-amount">KES {{action.current_loan_amount | number}} </h2>\n      <br/>\n\n      <div class="border-urgent-action-button" (click)="goToRefund()">\n        <div class="urgent-action-button">\n          <img src="assets/imgs/money-refund.png">\n          <h2 class="urgent-action-button-title">Refund</h2>\n        </div>\n      </div>\n    </ion-card>\n\n  </div>\n  \n  <!-- <div padding>\n    <ion-card class="home-functions-card">\n\n      <div class="home-functions home-functions-border-right home-functions-border-bottom" (click)="goToDeposit()">\n        <img src="assets/imgs/wallet-primary-color.png">\n        <p class="home-function-title">Deposit</p>\n      </div>\n\n      <div class="home-functions home-functions-border-left home-functions-border-bottom" (click)="goToWithdraw()">\n        <img src="assets/imgs/atm-primary-color.png">\n        <p class="home-function-title">Withdraw</p>\n      </div>\n\n      <div class="home-functions home-functions-border-top home-functions-border-right" (click)="goToBorrow()">\n        <img src="assets/imgs/loan-primary-color.png">\n        <p class="home-function-title">Borrow</p>\n      </div>\n\n      <div class="home-functions home-functions-border-top home-functions-border-left" (click)="goToRefund()">\n        <img src="assets/imgs/money-refund-primary-color.png">\n        <p class="home-function-title">Refund</p>\n      </div>\n\n    </ion-card>\n  </div> -->\n\n  <ion-card-header>\n    SHARE WITH FRIENDS\n  </ion-card-header>\n\n  <div class="social-icons">\n\n    <div class="social-share-logos whatsapp-share" (click)="whatsappShare()">\n      <ion-icon name="logo-whatsapp"></ion-icon>\n    </div>\n    <div class="social-share-logos facebook-share" (click)="facebookShare()">\n      <ion-icon name="logo-facebook"></ion-icon>\n    </div>\n    <div class="social-share-logos twitter-share" (click)="twitterShare()">\n      <ion-icon name="logo-twitter"></ion-icon>\n    </div>\n    <div class="social-share-logos email-share" (click)="emailShare()">\n      <ion-icon name="mail"></ion-icon>\n    </div>\n\n  </div>\n\n  <!-- <ion-card class="centered" padding>\n\n    <h2>Invite your friends</h2>\n    <br/>\n\n    <button ion-button block color="primary" (click)="inviteFriends()">Invite</button>\n      \n  </ion-card> -->\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminTransactionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_search_transaction_search_transaction__ = __webpack_require__(354);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AdminTransactionsPage = /** @class */ (function () {
    function AdminTransactionsPage(http, navCtrl, navParams, loadingControl, alertCtrl, popoverCtrl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingControl = loadingControl;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
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
    AdminTransactionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminTransactionsPage');
    };
    AdminTransactionsPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    AdminTransactionsPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    AdminTransactionsPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    AdminTransactionsPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    AdminTransactionsPage.prototype.getDepositHistory = function (requestedFrom, historyType, userType, transactionFromDate, transactionToDate, transactionCustomSearch) {
        var _this = this;
        var deposit_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var deposit_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var deposit_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var deposit_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=deposit&history_type=' + historyType + '&transaction_from_date=' + transactionFromDate + '&transaction_to_date=' + transactionToDate + '&custom_search=' + transactionCustomSearch + '&requesting_user_type=' + userType + '&firebase_id=' + deposit_firebase_id + '&user_slug=' + deposit_user_slug + '&current_token=' + deposit_current_token + '&suggested_token=' + deposit_currently_suggested_token + '&format=json').subscribe(function (depositsHistoryData) {
            _this.showAdminDepositSpinner = false;
            _this.depositsHistoryData = depositsHistoryData;
        }, function (err) {
        });
    };
    AdminTransactionsPage.prototype.getWithdrawalHistory = function (requestedFrom, historyType, userType, transactionFromDate, transactionToDate, transactionCustomSearch) {
        var _this = this;
        var withdrawal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var withdrawal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var withdrawal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var withdrawal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=withdrawal&history_type=' + historyType + '&transaction_from_date=' + transactionFromDate + '&transaction_to_date=' + transactionToDate + '&custom_search=' + transactionCustomSearch + '&requesting_user_type=' + userType + '&firebase_id=' + withdrawal_firebase_id + '&user_slug=' + withdrawal_user_slug + '&current_token=' + withdrawal_current_token + '&suggested_token=' + withdrawal_currently_suggested_token + '&format=json').subscribe(function (withdrawalsHistoryData) {
            _this.showvWithdrawalSpinner = false;
            _this.withdrawalsHistoryData = withdrawalsHistoryData;
        }, function (err) {
        });
    };
    AdminTransactionsPage.prototype.getBorrowalHistory = function (requestedFrom, historyType, userType, transactionFromDate, transactionToDate, transactionCustomSearch) {
        var _this = this;
        var borrowal_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var borrowal_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var borrowal_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var borrowal_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=borrow&history_type=' + historyType + '&transaction_from_date=' + transactionFromDate + '&transaction_to_date=' + transactionToDate + '&custom_search=' + transactionCustomSearch + '&requesting_user_type=' + userType + '&firebase_id=' + borrowal_firebase_id + '&user_slug=' + borrowal_user_slug + '&current_token=' + borrowal_current_token + '&suggested_token=' + borrowal_currently_suggested_token + '&format=json').subscribe(function (borrowalHistoryData) {
            _this.showAdminBorrowalSpinner = false;
            _this.borrowalHistoryData = borrowalHistoryData;
        }, function (err) {
        });
    };
    AdminTransactionsPage.prototype.getRefundHistory = function (requestedFrom, historyType, userType, transactionFromDate, transactionToDate, transactionCustomSearch) {
        var _this = this;
        var refund_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var refund_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var refund_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var refund_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.http.get(this.apiLink + '/rest_get_transactions_history/?transaction_type=refund&history_type=' + historyType + '&transaction_from_date=' + transactionFromDate + '&transaction_to_date=' + transactionToDate + '&custom_search=' + transactionCustomSearch + '&requesting_user_type=' + userType + '&firebase_id=' + refund_firebase_id + '&user_slug=' + refund_user_slug + '&current_token=' + refund_current_token + '&suggested_token=' + refund_currently_suggested_token + '&format=json').subscribe(function (refundsHistoryData) {
            _this.showAdminRefundSpinner = false;
            _this.refundsHistoryData = refundsHistoryData;
        }, function (err) {
        });
    };
    AdminTransactionsPage.prototype.proceedToTransactionVerification = function (transactionSlug, transactionType) {
        var _this = this;
        var transaction_verification_user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
        var transaction_verification_firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
        var transaction_verification_currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
        var transaction_verification_current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');
        this.showLoading("Processing ...");
        this.http.get(this.apiLink + '/rest_verify_transactions/?transaction_type=' + transactionType + '&transaction_slug=' + transactionSlug + '&firebase_id=' + transaction_verification_firebase_id + '&user_slug=' + transaction_verification_user_slug + '&current_token=' + transaction_verification_current_token + '&suggested_token=' + transaction_verification_currently_suggested_token + '&format=json').subscribe(function (transactionVerificationData) {
            _this.loader.dismiss();
            if (transactionVerificationData[0].result == '0') {
                _this.showErrorMessage(transactionVerificationData[0].error);
            }
            else {
                _this.showSuccessMessage(transactionVerificationData[0].success);
                if (transactionType == 'deposit') {
                    _this.getDepositHistory('normal', 'notifications', 'admin', '', '', '');
                }
                else if (transactionType == 'withdrawal') {
                    _this.getWithdrawalHistory('normal', 'notifications', 'admin', '', '', '');
                }
                else if (transactionType == 'borrow') {
                    _this.getBorrowalHistory('normal', 'notifications', 'admin', '', '', '');
                }
                else if (transactionType == 'refund') {
                    _this.getRefundHistory('normal', 'notifications', 'admin', '', '', '');
                }
                else if (transactionType == 'reject') {
                    _this.getDepositHistory('normal', 'notifications', 'admin', '', '', '');
                    _this.getWithdrawalHistory('normal', 'notifications', 'admin', '', '', '');
                    _this.getBorrowalHistory('normal', 'notifications', 'admin', '', '', '');
                    _this.getRefundHistory('normal', 'notifications', 'admin', '', '', '');
                }
                else { }
            }
        }, function (err) {
            _this.loader.dismiss();
        });
    };
    AdminTransactionsPage.prototype.transactionVerified = function (transactionSlug, transactionCode, transactionType) {
        var _this = this;
        var confirmMessage = '';
        if (transactionType == 'deposit') {
            confirmMessage = 'Have you received the deposit with the code ' + transactionCode + ' ?';
        }
        else if (transactionType == 'withdrawal') {
            confirmMessage = 'Have you sent the requested fund to the client for the withdrawal with the code ' + transactionCode + ' ?';
        }
        else if (transactionType == 'borrow') {
            confirmMessage = 'Have you sent the requested fund to the client for the loan with the code ' + transactionCode + ' ?';
        }
        else if (transactionType == 'refund') {
            confirmMessage = 'Have you received the refund with the code ' + transactionCode + ' ?';
        }
        else if (transactionType == 'reject') {
            confirmMessage = 'Do you want to reject the transaction with the code ' + transactionCode + ' ?';
        }
        else {
            confirmMessage = '';
        }
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire({
            title: 'Confirm',
            text: confirmMessage,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.value) {
                _this.proceedToTransactionVerification(transactionSlug, transactionType);
            }
            else if (result.dismiss === __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.DismissReason.cancel) {
                /* Swal.fire(
                  'Cancelled',
                  'Your imaginary file is safe :)',
                  'error'
                ) */
            }
        });
    };
    AdminTransactionsPage.prototype.searchTransaction = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_search_transaction_search_transaction__["a" /* SearchTransactionPage */]);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (searchData) {
            var emptyStatus = true;
            var emptyTransactionFromDate = true;
            var emptyTransactionToDate = true;
            var emptyTransactionCustomSearch = true;
            if (searchData != null) {
                var transactionStatus = searchData.transactionStatus;
                var transactionFromDate = searchData.transactionFromDate;
                var transactionToDate = searchData.transactionToDate;
                var transactionCustomSearch = searchData.transactionCustomSearch;
                if ((transactionStatus == null) || (transactionStatus == undefined) || (transactionStatus == '')) {
                    emptyStatus = false;
                }
                else {
                    emptyStatus = true;
                }
                if ((transactionFromDate == null) || (transactionFromDate == undefined) || (transactionFromDate == '')) {
                    emptyTransactionFromDate = false;
                }
                else {
                    emptyTransactionFromDate = true;
                }
                if ((transactionToDate == null) || (transactionToDate == undefined) || (transactionToDate == '')) {
                    emptyTransactionToDate = false;
                }
                else {
                    emptyTransactionToDate = true;
                }
                if ((transactionCustomSearch == null) || (transactionCustomSearch == undefined) || (transactionCustomSearch == '')) {
                    emptyTransactionCustomSearch = false;
                }
                else {
                    emptyTransactionCustomSearch = true;
                }
                if ((emptyStatus == true) && (emptyTransactionFromDate == true) && (emptyTransactionToDate == true) && (emptyTransactionCustomSearch == true)) {
                }
                else {
                    _this.showLoading("Searching ...");
                    _this.getDepositHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
                    _this.getWithdrawalHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
                    _this.getBorrowalHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
                    _this.getRefundHistory('search', transactionStatus, 'admin', transactionFromDate, transactionToDate, transactionCustomSearch);
                    _this.loader.dismiss();
                }
            }
        });
    };
    AdminTransactionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-admin-transactions',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/admin-transactions/admin-transactions.html"*/'<ion-header>\n\n  <ion-navbar>\n  	<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Admin</ion-title>\n    <ion-buttons right>\n      <button ion-button icon-only (click)="searchTransaction($event)">\n	  <ion-icon name="search" class="top-bar-icons"></ion-icon>\n	</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n	<ion-card class="transaction-title">\n	  {{transactionTitle}}\n	</ion-card>\n\n	<div class="data" padding>\n\n		<!-- <h2 class="notifications-title">\n			Deposits\n		</h2>\n\n		<div class="notifications-title" *ngIf="depositsHistoryData?.length == 0">\n			<h6 class="centered">No data found!  </h6>\n		</div>\n\n		<div *ngIf="showAdminDepositSpinner == true" class="centered">\n	      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n	    </div>\n\n		<ion-card class="centered" *ngFor="let notification of depositsHistoryData" padding>\n			\n			<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n			<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n			<h2>{{notification.transaction_code}}</h2>\n\n			<h2 class="transacted-amount">KES {{notification.transacted_amount}}</h2>\n			\n			<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n			<br/>\n\n			<button ion-button block outline color="primary" *ngIf="notification.verified == false" (click)="transactionVerified(notification.slug, notification.transaction_code, \'deposit\')">I Rececived</button>\n\n		</ion-card> -->\n\n\n		<!-- <h2 class="notifications-title">\n			Withdrawal\n		</h2>\n\n		<div class="notifications-title" *ngIf="withdrawalsHistoryData?.length == 0">\n			<h6 class="centered">No data found!  </h6>\n		</div>\n\n		<div *ngIf="showvWithdrawalSpinner == true" class="centered">\n	      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n	    </div>\n\n		<ion-card class="centered" *ngFor="let notification of withdrawalsHistoryData" padding>\n			\n			<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n			<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n			<h2>{{notification.transaction_code}}</h2>\n			\n			<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n			<br/>\n\n			<button ion-button block outline color="primary" *ngIf="notification.verified == false" (click)="transactionVerified(notification.slug, notification.transaction_code, \'withdrawal\')">Confirm Payment</button>\n\n		</ion-card> -->\n		<br/><br/>\n\n		<h2 class="notifications-title">\n			Loan Requests\n		</h2>\n\n		<div class="notifications-title" *ngIf="borrowalHistoryData?.length == 0">\n			<h6 class="centered">No data found!  </h6>\n		</div>\n\n		<div *ngIf="showAdminBorrowalSpinner == true" class="centered">\n	      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n	    </div>\n\n		<ion-card class="centered" *ngFor="let notification of borrowalHistoryData" padding>\n			\n			<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n			<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n			<h2>{{notification.transaction_code}}</h2>\n			\n			<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n			<br/>\n\n			<button ion-button class="sent" *ngIf="notification.verified == false" (click)="transactionVerified(notification.slug, notification.transaction_code, \'borrow\')">I PAID</button>\n\n			<button ion-button color="primary" *ngIf="notification.verified == false" (click)="transactionVerified(notification.slug, notification.transaction_code, \'reject\')">REJECT</button>\n			\n		</ion-card>\n\n		<h2 class="notifications-title">\n			Loan Refunds\n		</h2>\n\n		<div class="notifications-title" *ngIf="refundsHistoryData?.length == 0">\n			<h6 class="centered">No data found!  </h6>\n		</div>\n\n		<div *ngIf="showAdminRefundSpinner == true" class="centered">\n	      <ion-spinner name="bubbles" color="primary"></ion-spinner>\n	    </div>\n\n		<ion-card class="centered" *ngFor="let notification of refundsHistoryData" padding>\n			\n			<div class="status pending" *ngIf="notification.verified == false">Pending</div>\n			<div class="status complete" *ngIf="notification.verified == true">Complete</div>\n			<h2>{{notification.transaction_code}}</h2>\n			\n			<p>Requested on {{notification.transaction_carried_out_on_date_time | date}} {{notification.transaction_carried_out_on_date_time | date:\'shortTime\'}}  </p>\n			<br/>\n\n			<button ion-button block outline color="primary" *ngIf="notification.verified == false" (click)="transactionVerified(notification.slug, notification.transaction_code, \'refund\')">I Rececived</button>\n\n		</ion-card>\n		\n	</div>\n\n</ion-content>\n\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/admin-transactions/admin-transactions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* PopoverController */]])
    ], AdminTransactionsPage);
    return AdminTransactionsPage;
}());

//# sourceMappingURL=admin-transactions.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_sweetalert2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_create_user_create_user__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(http, navCtrl, navParams, menu, alertCtrl, loadingControl) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.loadingControl = loadingControl;
        this.apiLink = "https://myfedha-loanapp.herokuapp.com";
        this.menu = menu;
        this.menu.enable(false, 'sideMenuID');
        var userStoredIDNumber = window.localStorage.getItem('xUMy-Fedha15__userStoredIDNumber');
        if ((userStoredIDNumber == null) || (userStoredIDNumber == 'null') || (userStoredIDNumber == undefined) || (userStoredIDNumber == 'undefined') || (userStoredIDNumber == '')) {
            this.storedIDNumber = '';
            this.showIDNumberIDLabel = true;
        }
        else {
            this.storedIDNumber = userStoredIDNumber;
            this.showIDNumberIDLabel = false;
        }
        var userStoredTelephone = window.localStorage.getItem('xUMy-Fedha15__userStoredTelephone');
        if ((userStoredTelephone == null) || (userStoredTelephone == 'null') || (userStoredTelephone == undefined) || (userStoredTelephone == 'undefined') || (userStoredTelephone == '')) {
            this.storedTelephone = '';
            this.showTelephoneLabel = true;
        }
        else {
            this.storedTelephone = userStoredTelephone;
            this.showTelephoneLabel = false;
        }
        var userStoredFirstName = window.localStorage.getItem('xUMy-Fedha15__userStoredFirstName');
        if ((userStoredFirstName == null) || (userStoredFirstName == 'null') || (userStoredFirstName == undefined) || (userStoredFirstName == 'undefined') || (userStoredFirstName == '')) {
            this.storedFirstName = '';
            this.showFirstNameLabel = true;
        }
        else {
            this.storedFirstName = userStoredFirstName;
            this.showFirstNameLabel = false;
        }
        var userStoredLastName = window.localStorage.getItem('xUMy-Fedha15__userStoredLastName');
        if ((userStoredLastName == null) || (userStoredLastName == 'null') || (userStoredLastName == undefined) || (userStoredLastName == 'undefined') || (userStoredLastName == '')) {
            this.storedLastName = '';
            this.showLasstNameLabel = true;
        }
        else {
            this.storedLastName = userStoredLastName;
            this.showLasstNameLabel = false;
        }
        this.showEmailLabel = true;
        this.showPasswordLabel = true;
        this.showPasswordConfirmationLabel = true;
        this.showLoginPasswordLabel = true;
        this.showLoginUsernameLabel = true;
    }
    LoginPage.prototype.presentAlert = function (alertTitle, alertMsg) {
        var thePopup = this.alertCtrl.create({
            title: '' + alertTitle + '',
            subTitle: '' + alertMsg + '',
            buttons: ['OK']
        });
        thePopup.present();
    };
    LoginPage.prototype.showLoading = function (loadingMessage) {
        this.loader = this.loadingControl.create({
            content: "" + loadingMessage
        });
        this.loader.present();
    };
    LoginPage.prototype.showSuccessMessage = function (successMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Success!', '' + successMessage + '', 'success');
    };
    LoginPage.prototype.showInformationMessage = function (information) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Info!', '' + information + '', 'info');
    };
    LoginPage.prototype.showErrorMessage = function (errorMessage) {
        __WEBPACK_IMPORTED_MODULE_4_sweetalert2___default.a.fire('Error!', '' + errorMessage + '', 'error');
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        this.prism = document.getElementById("rec-prism");
    };
    LoginPage.prototype.showSignup = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
    };
    LoginPage.prototype.showLogin = function () {
        // this.prism.style.transform = "translateZ(-100px)";
    };
    LoginPage.prototype.wipeIDNumberLabel = function () {
        this.showIDNumberIDLabel = false;
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    LoginPage.prototype.alterIDNumberLabel = function () {
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
    };
    LoginPage.prototype.wipeTelephoneLabel = function () {
        this.showTelephoneLabel = false;
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    LoginPage.prototype.alterTelephoneLabel = function () {
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
    };
    LoginPage.prototype.wipeFirstNameLabel = function () {
        this.showFirstNameLabel = false;
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    LoginPage.prototype.alterFirstNameLabel = function () {
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
    };
    LoginPage.prototype.wipeLastNameLabel = function () {
        this.showLasstNameLabel = false;
        var sentTel = this.userTelephone.value;
        if (sentTel == '') {
            this.showTelephoneLabel = true;
        }
        var sentIdNumber = this.userIDNumber.value;
        if (sentIdNumber == '') {
            this.showIDNumberIDLabel = true;
        }
        var sentFirstName = this.userFirstName.value;
        if (sentFirstName == '') {
            this.showFirstNameLabel = true;
        }
    };
    LoginPage.prototype.alterLastNameLabel = function () {
        var sentLastName = this.userLarstName.value;
        if (sentLastName == '') {
            this.showLasstNameLabel = true;
        }
    };
    LoginPage.prototype.wipeEmailLabel = function () {
        this.showEmailLabel = false;
        var sentPassword = this.userPassword.value;
        if (sentPassword == '') {
            this.showPasswordLabel = true;
        }
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if (sentPasswordConfirmation == '') {
            this.showPasswordConfirmationLabel = true;
        }
    };
    LoginPage.prototype.alterEmailLabel = function () {
        var sentEmail = this.userEmail.value;
        if (sentEmail == '') {
            this.showEmailLabel = true;
        }
    };
    LoginPage.prototype.wipePasswordLabel = function () {
        this.showPasswordLabel = false;
        var sentEmail = this.userEmail.value;
        if (sentEmail == '') {
            this.showEmailLabel = true;
        }
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if (sentPasswordConfirmation == '') {
            this.showPasswordConfirmationLabel = true;
        }
    };
    LoginPage.prototype.alterPasswordLabel = function () {
        var sentPassword = this.userPassword.value;
        if (sentPassword == '') {
            this.showPasswordLabel = true;
        }
    };
    LoginPage.prototype.wipePasswordConfirmationLabel = function () {
        this.showPasswordConfirmationLabel = false;
        var sentEmail = this.userEmail.value;
        if (sentEmail == '') {
            this.showEmailLabel = true;
        }
        var sentPassword = this.userPassword.value;
        if (sentPassword == '') {
            this.showPasswordLabel = true;
        }
    };
    LoginPage.prototype.alterPasswordConfirmationLabel = function () {
        var sentPasswordConfirmation = this.confirmedPassword.value;
        if (sentPasswordConfirmation == '') {
            this.showPasswordConfirmationLabel = true;
        }
    };
    LoginPage.prototype.wipeLoginUsernameLabel = function () {
        this.showLoginUsernameLabel = false;
        var receivedPassword = this.userLoginPassword.value;
        if (receivedPassword == '') {
            this.showLoginPasswordLabel = true;
        }
    };
    LoginPage.prototype.alterLoginUsernameLabel = function () {
        var receivedEmail = this.loginUsername.value;
        if (receivedEmail == '') {
            this.showLoginUsernameLabel = true;
        }
    };
    LoginPage.prototype.wipeLoginPasswordLabel = function () {
        this.showLoginPasswordLabel = false;
        var receivedEmail = this.loginUsername.value;
        if (receivedEmail == '') {
            this.showLoginUsernameLabel = true;
        }
    };
    LoginPage.prototype.alterLoginPasswordLabel = function () {
        var receivedPassword = this.userLoginPassword.value;
        if (receivedPassword == '') {
            this.showLoginPasswordLabel = true;
        }
    };
    LoginPage.prototype.showNextSignupPage = function () {
        var idNumber = this.userIDNumber.value;
        var tel = this.userTelephone.value;
        var firstName = this.userFirstName.value;
        var lastName = this.userLarstName.value;
        if ((idNumber == '') || (tel == '') || (firstName == '') || (lastName == '')) {
            this.showErrorMessage("Please supply the whole data to proceed!");
        }
        else {
            window.localStorage.setItem('xUMy-Fedha15__userStoredIDNumber', idNumber);
            window.localStorage.setItem('xUMy-Fedha15__userStoredTelephone', tel);
            window.localStorage.setItem('xUMy-Fedha15__userStoredFirstName', firstName);
            window.localStorage.setItem('xUMy-Fedha15__userStoredLastName', lastName);
            // this.prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
        }
    };
    LoginPage.prototype.showForgotPassword = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
    };
    LoginPage.prototype.showContactUs = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
    };
    LoginPage.prototype.showThankYou = function () {
        // this.prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
    };
    LoginPage.prototype.testCreateAccount = function () {
        //var sentTel = this.userTelephone.value;
        //var sentIdNumber = this.userIDNumber.value;
        var sentFirstName = this.userFirstName.value;
        var sentLastName = this.userLarstName.value;
        var sentEmail = this.userEmail.value.toLowerCase();
        //var sentPassword = this.userPassword.value; 
        //var sentPasswordConfirmation = this.confirmedPassword.value;
        window.localStorage.setItem('xUMy-Fedha15__firebase_id', 'firebase');
        window.localStorage.setItem('xUMy-Fedha15__user_slug', sentFirstName);
        window.localStorage.setItem('xUMy-Fedha15__verified', 'true');
        window.localStorage.setItem('xUMy-Fedha15__email_address', sentEmail);
        window.localStorage.setItem('xUMy-Fedha15__first_name', sentFirstName);
        window.localStorage.setItem('xUMy-Fedha15__middle_name', '');
        window.localStorage.setItem('xUMy-Fedha15__last_name', sentLastName);
        window.localStorage.setItem('xUMy-Fedha15__profile_image_url', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredIDNumber', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredTelephone', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredFirstName', '');
        window.localStorage.setItem('xUMy-Fedha15__userStoredLastName', '');
        this.showSuccessMessage("Account created!");
        this.showLogin();
    };
    LoginPage.prototype.testLogin = function () {
        //var receivedEmail = this.loginUsername.value.toLowerCase();
        //var receivedPassword = this.userLoginPassword.value;
        window.localStorage.setItem('xUMy-Fedha15__isLogged', 'true');
        window.localStorage.setItem('xUMy-Fedha15__active_login_token', 'hjh5454');
        this.showSuccessMessage("Login successful");
        var theHomePage = { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] };
        this.navCtrl.setRoot(theHomePage.component);
    };
    LoginPage.prototype.testSignupUser = function () {
        var _this = this;
        var userTestSignupEmail = this.userEmail.value.toLowerCase();
        var userTestSignupPassword = this.userPassword.value;
        if ((userTestSignupEmail != '') && (userTestSignupPassword != '')) {
            this.showLoading("Account configuration ...");
            this.http.get(this.apiLink + '/rest_test_login_user/?email=' + userTestSignupEmail + '&password=' + userTestSignupPassword + '&format=json').subscribe(function (userTestData) {
                if (userTestData != '') {
                    if ((userTestData[0].user_firebase_id == 'none') && (userTestData[0].result == '1')) {
                        // this.updateuserRecordInFirebase(userTestSignupEmail, userTestSignupPassword);
                        _this.userExistsAndShouldLogin = 'true';
                        _this.loader.dismiss();
                    }
                    else {
                        _this.loader.dismiss();
                    }
                }
                else {
                    _this.loader.dismiss();
                }
            });
        }
    };
    LoginPage.prototype.testLoginUser = function () {
        var _this = this;
        var userTestLoginEmail = this.loginUsername.value.toLowerCase();
        var userTestLoginPassword = this.userLoginPassword.value;
        if ((userTestLoginEmail != '') && (userTestLoginPassword != '')) {
            this.showLoading("Account configuration ...");
            this.http.get(this.apiLink + '/rest_test_login_user/?email=' + userTestLoginEmail + '&password=' + userTestLoginPassword + '&format=json').subscribe(function (userTestData) {
                if (userTestData != '') {
                    if (userTestData[0].user_firebase_id == 'none') {
                        // this.updateuserRecordInFirebase(userTestLoginEmail, userTestLoginPassword);  
                        _this.loader.dismiss();
                    }
                    else {
                        _this.loader.dismiss();
                    }
                }
                else {
                    _this.loader.dismiss();
                }
            });
        }
    };
    LoginPage.prototype.proceedToDjangoLogin = function (fireBaseID) {
        var _this = this;
        var receivedEmail = this.loginUsername.value.toLowerCase();
        var receivedPassword = this.userLoginPassword.value;
        if ((receivedEmail == '') || (receivedPassword == '')) {
            this.showErrorMessage("please enter your email and password to proceed!");
        }
        else {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (receivedEmail.match(mailformat)) {
                this.showLoading("Authenticating, please wait...");
                this.http.get(this.apiLink + '/rest_authentication/?authentication_type=login&firebase_id=' + fireBaseID + '&email_address=' + receivedEmail + '&user_password=' + receivedPassword + '&format=json').subscribe(function (djangoLoginData) {
                    _this.loader.dismiss();
                    if (djangoLoginData != '') {
                        if (djangoLoginData[0].result == '1') {
                            window.localStorage.setItem('xUMy-Fedha15__isLogged', 'true');
                            window.localStorage.setItem('xUMy-Fedha15__active_login_token', djangoLoginData[0].active_login_token);
                            window.localStorage.setItem('xUMy-Fedha15__firebase_id', djangoLoginData[0].firebase_id);
                            window.localStorage.setItem('xUMy-Fedha15__user_slug', djangoLoginData[0].user_slug);
                            window.localStorage.setItem('xUMy-Fedha15__verified', djangoLoginData[0].verified);
                            window.localStorage.setItem('xUMy-Fedha15__email_address', djangoLoginData[0].email_address);
                            window.localStorage.setItem('xUMy-Fedha15__first_name', djangoLoginData[0].first_name);
                            window.localStorage.setItem('xUMy-Fedha15__middle_name', djangoLoginData[0].middle_name);
                            window.localStorage.setItem('xUMy-Fedha15__last_name', djangoLoginData[0].last_name);
                            window.localStorage.setItem('xUMy-Fedha15__profile_image_url', djangoLoginData[0].profile_image_url);
                            _this.showSuccessMessage(djangoLoginData[0].success);
                            /*this.navCtrl.push(HomePage);*/
                            var theHomePage = { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] };
                            _this.navCtrl.setRoot(theHomePage.component);
                            /*this.nav.setRoot(theHomePage.component);*/
                        }
                        else {
                            _this.showErrorMessage(djangoLoginData[0].error);
                        }
                    }
                    else {
                        _this.showErrorMessage("A server error has occured");
                    }
                }, function (err) {
                    _this.loader.dismiss();
                });
            }
            else {
                this.showErrorMessage("You have entered an invalid email address!");
            }
        }
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Change Password',
            message: 'Please enter your email address to proceed',
            inputs: [
                {
                    name: 'emailAddress',
                    placeholder: 'eg: me@email.com'
                } /*,
                {
                  name: 'password',
                  placeholder: 'Password',
                  type: 'password'
                }*/
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        /*console.log('Cancel clicked');*/
                    }
                },
                {
                    text: 'Proceed',
                    handler: function (data) {
                        var userEmail = data.emailAddress;
                        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (userEmail.match(mailformat)) {
                            _this.presentAlert("Success", 'Password change initiated!');
                            /*
                            this.showLoading("Sending code, please wait ...");
            
                            this.http.get(this.apiLink+'rest_reset_password/?userEmail='+userEmail+'&format=json').subscribe(
            
                              regeneratePasswordData => {
            
                                this.loader.dismiss();
            
            
                                if (regeneratePasswordData != '')
                                {
            
                                  if((regeneratePasswordData[0].regeneratePasswordData == '0')||(regeneratePasswordData[0].result == 0))
                                  {
                                    this.presentAlert("Error", regeneratePasswordData[0].error);
                                  }
                                  else
                                  {
                                    this.presentAlert("Success", regeneratePasswordData[0].success);
                                  }
            
                                }
                                else
                                {
                                  this.presentAlert("Error", "A server error has occured");
                                }
            
                              },
                              err => {
                                this.loader.dismiss();
                                this.presentAlert("Error!", err);
                              }
                            ) */
                        }
                        else {
                            _this.presentAlert("Error!", "Please enter a valid email address to proceed!");
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage.prototype.goToCreateNewUser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_create_user_create_user__["a" /* CreateUserPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('idNumber'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userIDNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('telephone'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userTelephone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('firstName'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userFirstName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lastName'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userLarstName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('email'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userEmail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('password'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userPassword", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('passwordConfirmation'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "confirmedPassword", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('username'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "loginUsername", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('loginPassword'),
        __metadata("design:type", Object)
    ], LoginPage.prototype, "userLoginPassword", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/login/login.html"*/'<ion-content class="login-container" padding>\n	\n	<span class="login-form-logo">\n		<ion-icon item-left name="person" color="primary"></ion-icon>\n	</span>\n\n	<!-- <span class="login100-form-title">\n		Log in\n	</span> -->\n\n	<ion-item>\n		<ion-icon color="white" item-left name="person"></ion-icon>\n		<ion-input class="login-input" type="email" placeholder="Username" name="email or telephone" #username required></ion-input>\n	</ion-item>\n\n	<ion-item>\n		<ion-icon color="white" item-left name="lock"></ion-icon>\n		<ion-input class="login-input" type="password" placeholder="Password" name="loginPassword" #loginPassword required></ion-input>\n	</ion-item>\n	<br/><Br/>\n\n	<button class="top-margin-10px" ion-button block outline color="light" type="submit" (click)="proceedToDjangoLogin(\'default\')">Login</button> <!-- proceedToDjangoLogin(\'ISVaVrzuILUePk4dWRmZ6k7JRPi1\') -->\n\n	<br/><br/>\n	<div class="forgot-password" (click)="forgotPassword()"><br/><b> Help! I forgot my password! </b> </div>\n\n	<button ion-button full (click)="goToCreateNewUser()" class="sign-up"> <ion-icon name="log-in"></ion-icon> &nbsp;&nbsp; Sign Up </button>\n\n</ion-content>\n'/*ion-inline-end:"/home/george/Projects/myfedha_mobile_app/myfedha/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[363]);
//# sourceMappingURL=main.js.map