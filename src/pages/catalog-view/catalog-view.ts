import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { SurveyProvider } from '../../providers/survey-provider';
import { Prize } from '../../models/Prize';
import { UserData } from '../../providers/user-data';
/**
 * Generated class for the CatalogViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalog-view',
  templateUrl: 'catalog-view.html',
})
export class CatalogViewPage {
  catalog: Array<Prize>;
  constructor(public surveyProvider: SurveyProvider, public userData: UserData,
    public alertCtrl: AlertController, public navCtrl: NavController,
    public navParams: NavParams, public loadingController: LoadingController) {
    console.log("Entro al catalogo"); 
    console.log("Entro al catalogo");
    let loading = this.loadingController.create({
      content: "Obteniendo encuestas"
    });
    loading.present();
    this.catalog = this.surveyProvider.getPrizesCatalog(this.userData);
    loading.dismiss();
  }

  ionViewLoaded() {
    console.log("Entro al catalogo");
    let loading = this.loadingController.create({
      content: "Obteniendo encuestas"
    });
    loading.present();
    this.catalog = this.surveyProvider.getPrizesCatalog(this.userData);
    loading.dismiss();
    /* 
    .then((data) => {
      this.catalog = <[Prize]>data;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Equipos Pregunta',
        subTitle: 'Error al obtener encuestas',
        buttons: [{
          text: 'cancel',
          role: 'canel'

        }]
      });
      alert.present();

      console.log(err);
    });
   */

  }


  select(p: Prize) {
    console.log(p);
    let confirm = this.alertCtrl.create({
      title: 'Premio',
      message: '¿Desea canjear el premio solicitado?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
