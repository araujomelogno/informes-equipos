import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SurveyHolder } from '../../services/SurveyHolder';


/*
  Generated class for the RangeQuestion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-range-question',
  templateUrl: 'range-question.html'
})
export class RangeQuestionPage {
  surveyHolder: SurveyHolder;
  answerValue: Number = 0;  
  constructor(public nav: NavController, public navParams: NavParams) {
    this.surveyHolder = this.navParams.get('surveyHolder');
  }

  next() {
    debugger;
    console.log(this.surveyHolder.currentQuestion.answer); 
    this.surveyHolder.next();
  }

  prev() { 
    this.surveyHolder.prev();
  }


}
