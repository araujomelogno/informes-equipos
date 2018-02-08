import { Component } from '@angular/core';
import { AlertController,IonicPage ,LoadingController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { SurveyProvider } from '../../providers/survey-provider'; 
@IonicPage()
@Component({
  selector: 'page-completed-surveys',
  templateUrl: 'completed-surveys.html'
})
export class CompletedSurveysPage {
  completedSurveys: { surveyTitle: string, surveyDescription: string , started:Date }[] = [];
  constructor( public loadingController: LoadingController,public surveyProvider:SurveyProvider, 
  public userData:UserData, public alertCtrl:AlertController) { 
   }

  ionViewDidLoad() {
    console.log('Hello CompletedSurveys Page');
    let loading = this.loadingController.create({
      content: "Obteniendo encuestas completas"
    });

    loading.present();
    this.surveyProvider.getCompletedSurveys(this.userData).then((data) => {
      debugger;
      this.completedSurveys = <[any]>data;
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Equipos Pregunta',
        subTitle: 'Error al obtener encuestas completas',
        buttons: [{
          text: 'cancel',
          role: 'canel'

        }]
      });
      alert.present();

      console.log(err);
    });
  }

}
