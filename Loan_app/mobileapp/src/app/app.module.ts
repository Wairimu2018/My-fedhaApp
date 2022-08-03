import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Market } from '@ionic-native/market';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { CreateUserPage } from '../pages/create-user/create-user';
import { CompleteProfileSetupPage } from '../pages/complete-profile-setup/complete-profile-setup';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DepositPage } from '../pages/deposit/deposit';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { BorrowPage } from '../pages/borrow/borrow';
import { RefundPage } from '../pages/refund/refund';
import { SettingsPage } from '../pages/settings/settings';
import { HistoryPage } from '../pages/history/history';
import { MpesaPaymentProcedurePage } from '../pages/mpesa-payment-procedure/mpesa-payment-procedure';
import { AdminTransactionsPage } from '../pages/admin-transactions/admin-transactions';
import { SearchTransactionPage } from '../pages/search-transaction/search-transaction';
import { HelpPage } from '../pages/help/help';
import { AboutUsPage } from '../pages/about-us/about-us';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { OurPolicyPage } from '../pages/our-policy/our-policy';
import { PendingActivitiesPage } from '../pages/pending-activities/pending-activities';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CreateUserPage,    
    CompleteProfileSetupPage,
    LoginPage,
    HomePage,
    DepositPage,
    WithdrawPage,
    BorrowPage,
    RefundPage,
    SettingsPage,
    HistoryPage,
    PendingActivitiesPage,
    MpesaPaymentProcedurePage,
    AdminTransactionsPage,
    SearchTransactionPage,
    HelpPage,
    AboutUsPage,
    MyProfilePage,
    OurPolicyPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CreateUserPage,    
    CompleteProfileSetupPage,
    LoginPage,
    HomePage,
    DepositPage,
    WithdrawPage,
    BorrowPage,
    RefundPage,
    SettingsPage,
    HistoryPage,
    PendingActivitiesPage,
    MpesaPaymentProcedurePage,
    AdminTransactionsPage,
    SearchTransactionPage,
    HelpPage,
    AboutUsPage,
    MyProfilePage,
    OurPolicyPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Market,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
