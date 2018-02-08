import { Component } from '@angular/core';
import { IonicPage, NavController,ActionSheetController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SurveyHolder } from '../../services/SurveyHolder';
/**
 * Generated class for the PausedSurveysPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paused-surveys',
  templateUrl: 'paused-surveys.html',
})
export class PausedSurveysPage {
  pausedSurveys: { surveyName: string, pausedDate: Date }[] = [];

  constructor(public surveyHolder: SurveyHolder,public actionSheetCtrl: ActionSheetController, public storage: Storage, public loadingController: LoadingController, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.storage.get('surveyList').then((data) => {
      if (data) {
        this.pausedSurveys = <{ surveyName: string, pausedDate: Date }[]>data;
      }
    });
  }


  surveyClicked(survey: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: survey.title,
      cssClass: 'action-she-basic-page',
      buttons: [
        {
          text: 'Responder',
          handler: () => {
            this.openSurvey(survey);
          }
        }, {
          text: 'Borrar',
          handler: () => {
            this.removeSurvey(survey);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  openSurvey(pausedSurvey: any) {
    debugger;
    this.storage.get(pausedSurvey.surveyName).then((value) => {
      if(value) {
        debugger;
        this.storage.remove(pausedSurvey.surveyName);
        let survey = value.survey;
        this.surveyHolder.setSurvey(survey);
        this.surveyHolder.setSetAnswers(value.surveyAnswers);
        this.surveyHolder.setCurrentQuestionIndex(value.currentQuestionIndex);
        this.surveyHolder.setStarted(value.surveyStarted);
        this.surveyHolder.setCurrentQuestion(value.currentQuestion);
        //lo saco de la listas pausadas
        this.removeSurvey(pausedSurvey);
        this.surveyHolder.enableInSurveyMenu();
        this.surveyHolder.gotoQuestion();
      }
    });



  }

  removeSurvey(survey:any) {
    for (let i = 0; i < this.pausedSurveys.length; i++) {
      if (this.pausedSurveys[i] == survey) {
        this.pausedSurveys.splice(i, 1);
        this.storage.remove(survey.surveyName);
        this.storage.set('surveyList',this.pausedSurveys);
      }
    }
  }

}
