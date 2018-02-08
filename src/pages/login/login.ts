import { Component } from '@angular/core';

import { AlertController, Loading, LoadingController, NavController } from 'ionic-angular';


import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { EmailValidator } from '../../validators/EmailValidator';
import { AuthProvider } from '../../providers/auth/auth';
import { UserData } from '../../providers/user-data';
import firebase from 'firebase';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  submitted = false;

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public userData: UserData, public navCtrl: NavController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public authProvider: AuthProvider, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });
  }


  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password)
        .then((user: any) => {
          if (this.loading != null)
            this.loading.dismiss();
          console.log(user);
          this.userData.login(user, firebase.database().ref(`/userProfile/${user.uid}`));
          this.navCtrl.setRoot(HomePage);
        }, (error: any) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(): void { this.navCtrl.push(SignupPage); }

  goToResetPassword(): void { this.navCtrl.push(ResetPasswordPage); }

}
