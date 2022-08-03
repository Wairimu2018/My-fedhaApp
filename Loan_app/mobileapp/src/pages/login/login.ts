import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { NavController, NavParams, AlertController, MenuController, LoadingController } from 'ionic-angular';
import Swal from 'sweetalert2'

import { HomePage } from '../../pages/home/home';
import { CreateUserPage } from '../../pages/create-user/create-user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public prism: any;
  public apiLink: any;
  public loader: any;
  public newAccountData: any;
  public djangoLoginData: any;
  public storedIDNumber: any;
  public storedTelephone: any;
  public storedFirstName: any;
  public storedLastName: any;
  public showIDNumberIDLabel: any;
  public showTelephoneLabel: any;
  public showFirstNameLabel: any;
  public showLasstNameLabel: any;
  public showEmailLabel: any;
  public showPasswordLabel: any;
  public showPasswordConfirmationLabel: any;
  public showLoginPasswordLabel: any;
  public showLoginUsernameLabel: any;
  public userExistsAndShouldLogin: any;

  @ViewChild('idNumber') userIDNumber;
  @ViewChild('telephone') userTelephone;
  @ViewChild('firstName') userFirstName;
  @ViewChild('lastName') userLarstName;
  @ViewChild('email') userEmail;
  @ViewChild('password') userPassword;
  @ViewChild('passwordConfirmation') confirmedPassword;
  @ViewChild('username') loginUsername;
  @ViewChild('loginPassword') userLoginPassword;  

  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private alertCtrl: AlertController, public loadingControl: LoadingController) {

      this.apiLink = "http://localhost:8000";
    // this.apiLink = "https://myfedha-loanapp.herokuapp.com";

    this.menu = menu;
    this.menu.enable(false, 'sideMenuID');

    var userStoredIDNumber = window.localStorage.getItem('xUMy-Fedha15__userStoredIDNumber');
    if((userStoredIDNumber==null)||(userStoredIDNumber=='null')||(userStoredIDNumber==undefined)||(userStoredIDNumber=='undefined')||(userStoredIDNumber==''))
    {
      this.storedIDNumber = '';
      this.showIDNumberIDLabel = true;
    }
    else
    {
      this.storedIDNumber = userStoredIDNumber;
      this.showIDNumberIDLabel = false;
    }

    var userStoredTelephone = window.localStorage.getItem('xUMy-Fedha15__userStoredTelephone');
    if((userStoredTelephone==null)||(userStoredTelephone=='null')||(userStoredTelephone==undefined)||(userStoredTelephone=='undefined')||(userStoredTelephone==''))
    {
      this.storedTelephone = '';
      this.showTelephoneLabel = true;
    }
    else
    {
      this.storedTelephone = userStoredTelephone;
      this.showTelephoneLabel = false;
    }

    var userStoredFirstName = window.localStorage.getItem('xUMy-Fedha15__userStoredFirstName');
    if((userStoredFirstName==null)||(userStoredFirstName=='null')||(userStoredFirstName==undefined)||(userStoredFirstName=='undefined')||(userStoredFirstName==''))
    {
      this.storedFirstName = '';
      this.showFirstNameLabel = true;
    }
    else
    {
      this.storedFirstName = userStoredFirstName;
      this.showFirstNameLabel = false; 
    }

    var userStoredLastName = window.localStorage.getItem('xUMy-Fedha15__userStoredLastName');
    if((userStoredLastName==null)||(userStoredLastName=='null')||(userStoredLastName==undefined)||(userStoredLastName=='undefined')||(userStoredLastName==''))
    {
      this.storedLastName = '';
      this.showLasstNameLabel = true;
    }
    else
    {
      this.storedLastName = userStoredLastName;
      this.showLasstNameLabel = false;
    }

    this.showEmailLabel = true;
    this.showPasswordLabel = true;
    this.showPasswordConfirmationLabel = true;
    this.showLoginPasswordLabel = true;
    this.showLoginUsernameLabel = true;

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

  showInformationMessage(information: String) {

    Swal.fire(
      'Info!',
      ''+information+'',
      'info'
      )

  }

  showErrorMessage(errorMessage: String) {

    Swal.fire(
      'Error!',
      ''+errorMessage+'',
      'error'
      )
    
  }

  ionViewDidLoad() {
  	this.prism = document.getElementById("rec-prism");
  }

  showSignup(){
  	// this.prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
  }

  showLogin(){
  	// this.prism.style.transform = "translateZ(-100px)";
  }

  wipeIDNumberLabel() {
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

  }

  alterIDNumberLabel() {
    var sentIdNumber = this.userIDNumber.value;
    if (sentIdNumber == '') {
      this.showIDNumberIDLabel = true;
    }
  }

  wipeTelephoneLabel() {
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
  }

  alterTelephoneLabel() {
    var sentTel = this.userTelephone.value;
    if (sentTel == '') {
      this.showTelephoneLabel = true;
    }
  }

  wipeFirstNameLabel() {
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
  }

  alterFirstNameLabel() {
    var sentFirstName = this.userFirstName.value;
    if (sentFirstName == '') {
      this.showFirstNameLabel = true;
    }
  }

  wipeLastNameLabel() {
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

  }

  alterLastNameLabel() {
    var sentLastName = this.userLarstName.value;
    if (sentLastName == '') {
      this.showLasstNameLabel = true;
    }
  }

  wipeEmailLabel() {
    this.showEmailLabel = false;

    var sentPassword = this.userPassword.value;
    if (sentPassword == '') {
      this.showPasswordLabel = true;
    }
    
    var sentPasswordConfirmation = this.confirmedPassword.value;
    if (sentPasswordConfirmation == '') {
      this.showPasswordConfirmationLabel = true;
    }

  }

  alterEmailLabel() {
    var sentEmail = this.userEmail.value;
    if (sentEmail == '') {
      this.showEmailLabel = true;
    }
  }

  wipePasswordLabel() {
    this.showPasswordLabel = false;

    var sentEmail = this.userEmail.value;
    if (sentEmail == '') {
      this.showEmailLabel = true;
    }

    var sentPasswordConfirmation = this.confirmedPassword.value;
    if (sentPasswordConfirmation == '') {
      this.showPasswordConfirmationLabel = true;
    }

  }

  alterPasswordLabel() {
    var sentPassword = this.userPassword.value; 
    if (sentPassword == '') {
      this.showPasswordLabel = true;
    }
  }

  wipePasswordConfirmationLabel() {
    this.showPasswordConfirmationLabel = false;

    var sentEmail = this.userEmail.value;
    if (sentEmail == '') {
      this.showEmailLabel = true;
    }

    var sentPassword = this.userPassword.value;
    if (sentPassword == '') {
      this.showPasswordLabel = true;
    }

  }

  alterPasswordConfirmationLabel() {
    var sentPasswordConfirmation = this.confirmedPassword.value;
    if (sentPasswordConfirmation == '') {
      this.showPasswordConfirmationLabel = true;
    }
  }

  wipeLoginUsernameLabel() {
    this.showLoginUsernameLabel = false;

    var receivedPassword = this.userLoginPassword.value;
    if (receivedPassword == '') {
      this.showLoginPasswordLabel = true;
    }

  }

  alterLoginUsernameLabel() {
    var receivedEmail = this.loginUsername.value; 
    if (receivedEmail == '') {
      this.showLoginUsernameLabel = true;
    }
  }

  wipeLoginPasswordLabel() {
    this.showLoginPasswordLabel = false;

    var receivedEmail = this.loginUsername.value; 
    if (receivedEmail == '') {
      this.showLoginUsernameLabel = true;
    }

  }

  alterLoginPasswordLabel() {
    var receivedPassword = this.userLoginPassword.value;
    if (receivedPassword == '') {
      this.showLoginPasswordLabel = true;
    }
  }

  showNextSignupPage(){

    var idNumber = this.userIDNumber.value;
    var tel = this.userTelephone.value;
    var firstName = this.userFirstName.value;
    var lastName = this.userLarstName.value;

    if ((idNumber == '')||(tel == '')||(firstName == '')||(lastName == '')) {

      this.showErrorMessage("Please supply the whole data to proceed!");
    }
    else
    {
      window.localStorage.setItem('xUMy-Fedha15__userStoredIDNumber', idNumber);
      window.localStorage.setItem('xUMy-Fedha15__userStoredTelephone', tel);
      window.localStorage.setItem('xUMy-Fedha15__userStoredFirstName', firstName);
      window.localStorage.setItem('xUMy-Fedha15__userStoredLastName', lastName);

      // this.prism.style.transform = "translateZ(-100px) rotateY( -180deg)";

    }

  }

  showForgotPassword(){
  	// this.prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
  }

  showContactUs(){
  	// this.prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
  }

  showThankYou(){
  	// this.prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
  }

  testCreateAccount() {

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

  }

  testLogin() {

    //var receivedEmail = this.loginUsername.value.toLowerCase();
    //var receivedPassword = this.userLoginPassword.value;

    window.localStorage.setItem('xUMy-Fedha15__isLogged', 'true');
    window.localStorage.setItem('xUMy-Fedha15__active_login_token', 'hjh5454');

    this.showSuccessMessage("Login successful");

    var theHomePage = { title: 'Home', component: HomePage };
    this.navCtrl.setRoot(theHomePage.component);

  }

  testSignupUser() {

    var userTestSignupEmail = this.userEmail.value.toLowerCase();
    var userTestSignupPassword = this.userPassword.value;

    if((userTestSignupEmail != '')&&(userTestSignupPassword != '')) {

      this.showLoading("Account configuration ...");

      this.http.get(this.apiLink+'/rest_test_login_user/?email='+userTestSignupEmail+'&password='+userTestSignupPassword+'&format=json').subscribe(

        userTestData => {

          if (userTestData != '') {
            if ((userTestData[0].user_firebase_id == 'none')&&(userTestData[0].result == '1')) {

              // this.updateuserRecordInFirebase(userTestSignupEmail, userTestSignupPassword);
              this.userExistsAndShouldLogin = 'true';

              this.loader.dismiss();

            }
            else
            {
              this.loader.dismiss();
            }
          }
          else
          {
            this.loader.dismiss();
          }


        })

    }

  }

  testLoginUser() {

    var userTestLoginEmail = this.loginUsername.value.toLowerCase();
    var userTestLoginPassword = this.userLoginPassword.value;

    if((userTestLoginEmail != '')&&(userTestLoginPassword != '')) {

      this.showLoading("Account configuration ...");

      this.http.get(this.apiLink+'/rest_test_login_user/?email='+userTestLoginEmail+'&password='+userTestLoginPassword+'&format=json').subscribe(

        userTestData => {

          if (userTestData != '') {
            if (userTestData[0].user_firebase_id == 'none') {

              // this.updateuserRecordInFirebase(userTestLoginEmail, userTestLoginPassword);  

              this.loader.dismiss();            

            }
            else
            {
              this.loader.dismiss();
            }
          }
          else
          {
            this.loader.dismiss();
          }


        })

    }
    
  }

  proceedToDjangoLogin(fireBaseID: String) {

    var receivedEmail = this.loginUsername.value.toLowerCase();
    var receivedPassword = this.userLoginPassword.value;

    if((receivedEmail == '')||(receivedPassword == '')) {

      this.showErrorMessage("please enter your email and password to proceed!");

    }
    else
    {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
      if(receivedEmail.match(mailformat))  
      {
        this.showLoading("Authenticating, please wait...");

        this.http.get(this.apiLink+'/rest_authentication/?authentication_type=login&firebase_id='+fireBaseID+'&email_address='+receivedEmail+'&user_password='+receivedPassword+'&format=json').subscribe(

          djangoLoginData => {

            this.loader.dismiss();

            if(djangoLoginData != '') {

            if(djangoLoginData[0].result == '1')
            {
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

              this.showSuccessMessage(djangoLoginData[0].success);

              /*this.navCtrl.push(HomePage);*/

              var theHomePage = { title: 'Home', component: HomePage };
              this.navCtrl.setRoot(theHomePage.component);

              /*this.nav.setRoot(theHomePage.component);*/

            }
            else
            {
              this.showErrorMessage(djangoLoginData[0].error);
            }

          }
          else
          {
            this.showErrorMessage("A server error has occured");
          }

          },err => {
            this.loader.dismiss();
          })

      }  
      else  
      {  
        this.showErrorMessage("You have entered an invalid email address!");
      } 
    
    }
  
  }

  forgotPassword() {

    let alert = this.alertCtrl.create({
      title: 'Change Password',
      message: 'Please enter your email address to proceed',
      inputs: [
        {
          name: 'emailAddress',
          placeholder: 'eg: me@email.com'
        }/*,
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
          handler: data => {
            /*console.log('Cancel clicked');*/
          }
        },
        {
          text: 'Proceed',
          handler: data => {

            var userEmail = data.emailAddress;
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
              if(userEmail.match(mailformat))  
              {
                this.presentAlert("Success", 'Password change initiated!');

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
              else
              {
                this.presentAlert("Error!", "Please enter a valid email address to proceed!");
              }
          }
        }
      ]
    });
    alert.present();

  }

  goToCreateNewUser() {
    this.navCtrl.push(CreateUserPage);
  }

}
