import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient } from '@angular/common/http';
import { Market } from '@ionic-native/market';
import Swal from 'sweetalert2';

import { HomePage } from '../pages/home/home';
// import { DepositPage } from '../pages/deposit/deposit';
// import { WithdrawPage } from '../pages/withdraw/withdraw';
import { BorrowPage } from '../pages/borrow/borrow';
import { RefundPage } from '../pages/refund/refund';
import { SettingsPage } from '../pages/settings/settings';
import { PendingActivitiesPage } from '../pages/pending-activities/pending-activities';
import { LoginPage } from '../pages/login/login';
import { AdminTransactionsPage } from '../pages/admin-transactions/admin-transactions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;

  public rootPage: any;
  public loader: any;
  public apiLink: any;
  public userFullName: any;
  public isAdmin: any;
  public userImage: any;
  public renewTokenLoop: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public loadingControl: LoadingController, public http: HttpClient, public market: Market) {
    this.initializeApp();

    this.apiLink = "https://myfedha-loanapp.herokuapp.com/";
    this.launchLoginTokenRenewal();

    var adminCheck = window.localStorage.getItem('xUMy-Fedha15__is_admin');
    if((adminCheck == 'true')||(adminCheck == 'True'))
    {
      this.isAdmin = 'true';
    }
    else
    {
      this.isAdmin = 'false';
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      /* { title: 'Deposit', component: DepositPage },
      { title: 'Withdraw', component: WithdrawPage }, */
      { title: 'Borrow', component: BorrowPage },
      { title: 'Refund', component: RefundPage },
      { title: 'Pending Transactions', component: PendingActivitiesPage },
      { title: 'Settings', component: SettingsPage },      
      { title: 'Administrator', component: AdminTransactionsPage }
    ];

    var user_first_name = window.localStorage.getItem('xUMy-Fedha15__first_name');
    var user_last_name = window.localStorage.getItem('xUMy-Fedha15__last_name');

    if ((user_first_name == null)||(user_first_name == 'null')||(user_first_name == '')||(user_first_name == undefined)||(user_first_name == 'undefined')) {
      window.localStorage.setItem('xUMy-Fedha15__user_full_name', 'empty');
    }
    else
    {
      var theUserFullName = user_first_name+' '+user_last_name;
      window.localStorage.setItem('xUMy-Fedha15__user_full_name', theUserFullName);
    }

    this.userFullName = window.localStorage.getItem('xUMy-Fedha15__user_full_name');

    var user_profile_image = window.localStorage.getItem('xUMy-Fedha15__profile_image_url');

    if ((user_profile_image == null)||(user_profile_image == 'null')||(user_profile_image == '')||(user_profile_image == undefined)||(user_profile_image == 'undefined')) {
      window.localStorage.setItem('xUMy-Fedha15__profile_image_url', 'empty');
    }

    this.userImage = window.localStorage.getItem('xUMy-Fedha15__profile_image_url');

  }

  // renew login token

  renewToken() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_authentication/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      tokenRenewalData => {

        if(tokenRenewalData[0].result == '11')
        {
          window.localStorage.setItem('xUMy-Fedha15__suggested_token', tokenRenewalData[0].suggested_token);
          window.localStorage.setItem('xUMy-Fedha15__active_login_token', currently_suggested_token);
          window.localStorage.setItem('xUMy-Fedha15__is_admin', tokenRenewalData[0].is_admin);
        }
        else if(tokenRenewalData[0].result == '10')
        {
          window.localStorage.setItem('xUMy-Fedha15__suggested_token', tokenRenewalData[0].suggested_token);
        }
        else
        {}

        },err => {

        })

  }

  checkAppVersion() {

    var appInstalledVersion = '0.0.7';

    this.http.get(this.apiLink+'/rest_test_app_version/?format=json').subscribe(

      appVersionData => {

        if(appVersionData[0].current_version != appInstalledVersion)
        {
          Swal.fire({
            title: 'New App update',
            text: 'Please update your app!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update!',
            cancelButtonText: 'I will update later!'
          }).then((result) => {
            if (result.value) {

              // window.open('http://play.google.com/store/apps/details?id=com.my-fedha.com', '_system');

              this.market.open('com.my-fedha.com');


            } else if (result.dismiss === Swal.DismissReason.cancel) {
              /*Swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )*/
            }
          })

        }

        },err => {

        })

  }

  launchLoginTokenRenewal() {

    var loginInfo = window.localStorage.getItem('xUMy-Fedha15__isLogged');
    if(loginInfo == 'true') {

      this.renewTokenLoop = setInterval(() => {
      this.renewToken();

      // clearInterval(this.renewTokenLoop);

      }, 40000);

    }

  }

  showLoading() {
    this.loader = this.loadingControl.create({
      content: "Authenticating, please wait..."
    });

    this.loader.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.checkAppVersion();

      this.showLoading();

      var loginValue =  window.localStorage.getItem('xUMy-Fedha15__isLogged');

      if(loginValue == 'true') {
        this.rootPage = HomePage;
      }
      else
      {
        this.rootPage = LoginPage;
      }

      this.loader.dismiss();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
