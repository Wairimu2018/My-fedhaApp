import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  public apiLink: any;
  public loader: any;
  public userData: any;

  @ViewChild('loginPassword') userLoginPassword; 

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingControl: LoadingController) {

    this.apiLink = "https://myfedha.herokuapp.com";

    this.viewUserDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
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

  viewUserDetails() {

    var user_slug = window.localStorage.getItem('xUMy-Fedha15__user_slug');
    var firebase_id = window.localStorage.getItem('xUMy-Fedha15__firebase_id');
    var currently_suggested_token = window.localStorage.getItem('xUMy-Fedha15__suggested_token');
    var current_token = window.localStorage.getItem('xUMy-Fedha15__active_login_token');

    this.http.get(this.apiLink+'/rest_user_details/?user_to_view_slug='+user_slug+'&firebase_id='+firebase_id+'&user_slug='+user_slug+'&current_token='+current_token+'&suggested_token='+currently_suggested_token+'&format=json').subscribe(

      userData => {

        this.userData = userData;

        },err => {

        })

  }

  updatePassword() {
  	
  }

}
