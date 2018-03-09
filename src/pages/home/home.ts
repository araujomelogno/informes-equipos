import { Component } from '@angular/core';
import { MenuController, LoadingController, IonicPage, ActionSheetController, AlertController, NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  surveys: Array<any>;
  surveyList: [any];
  constructor(public storage: Storage, public menu: MenuController,
    public userData: UserData,
    public alertCtrl: AlertController, public http: Http,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
    public loadingController: LoadingController, public authProvider: AuthProvider) {
    this.surveys = [];

    this.ionViewLoaded();




  }



  ionViewLoaded() {
    let loading = this.loadingController.create({
      content: "Obteniendo encuestas"
    });

    loading.present();



  }



}
