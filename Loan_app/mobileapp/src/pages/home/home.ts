import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import Swal from 'sweetalert2';

import { DepositPage } from '../../pages/deposit/deposit';
import { WithdrawPage } from '../../pages/withdraw/withdraw';
import { BorrowPage } from '../../pages/borrow/borrow';
import { RefundPage } from '../../pages/refund/refund';
import { HistoryPage } from '../../pages/history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public apiLink: any;
  public userImage: any;
  public showSpinner: any;
  public userFullName: any;
  public userUrgentActionData: any;
  public nbrOfNotifications: any;
  public nbrOfUrgentActionsLoop: any;
  public nbrOfNotificationsLoop: any;
  public numberOfUserNotificationsData: any;

  constructor(public http: HttpClient, public socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public actionSheetCtrl: ActionSheetController, public loadingControl: LoadingController) {
  	this.apiLink = "https://myfedha-loanapp.herokuapp.com";
    
    this.getUrgentAction();
    this.fetchNotifications();
    this.launchUrgentActionFetch();
    this.launchNotificationsFetch();

    this.showSpinner = true;

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

  getUrgentAction() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_get_user_urgent_action/?firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      userUrgentActionData => {

        this.showSpinner = false;

        this.userUrgentActionData = userUrgentActionData;

        },err => {

        })

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

  goToDeposit() {
  	this.navCtrl.push(DepositPage);
  }

  goToWithdraw() {
  	this.navCtrl.push(WithdrawPage);
  }

  goToBorrow() {
  	this.navCtrl.push(BorrowPage);
  }

  goToRefund() {
  	this.navCtrl.push(RefundPage);
  }

  selectInvitationMethod() {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Send invitation',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();  

  }

  inviteFriends() {

    this.socialSharing.share("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", 'My-Fedha', null)
    .then(() => {
    })
    .catch(() => {
    });
  }

  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
  }

  twitterShare(){
    this.socialSharing.shareViaTwitter("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
  }

  facebookShare(){
    this.socialSharing.shareViaFacebook("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
  }

  emailShare(){
    this.socialSharing.shareViaEmail("Have you tried the My-Fedha mobile App yet? It\s the best to get access to financial services and instant loans. You can download it from this link: https://play.google.com/store/apps/details?id=com.my-fedha.com&hl=en You can also access the website https://myfedha.herokuapp.com/ for more information.", "My-Fedha", null);
  }

}
