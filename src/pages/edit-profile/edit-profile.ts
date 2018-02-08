import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
//import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  public userProfile: any;
  //email: string;
  //password: string;
  //name: string;
  birthDate: string;
  sex: string;
  location: string;
  loading: any;

  constructor(public userData: UserData, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

 
  }


  ionViewDidEnter() {

    console.log('Hello EditProfile Page');
    this.userData.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot!.val();
      this.birthDate = userProfileSnapshot!.val().birthDate;
      this.sex = userProfileSnapshot!.val().sex;
      this.location = userProfileSnapshot!.val().location;
    });
  }


  updateName() {
    const alert = this.alertCtrl.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate: string) {
    this.userData.updateDOB(birthDate);
  }


  updateSex(sex: string) {
    this.userData.updateSex(sex);
  }

  updateLocation(location: string) {
    this.userData.updateLocation(location);
  }

  updateEmail() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            let newEmail = data.newEmail;

            this.userData.updateEmail(data.newEmail, data.password).then(() => {
              this.userProfile.email = newEmail;
            }).catch((error:any) => {
              console.log('ERROR: ' + error.message);
            });
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword() {
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.userData.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }




}
