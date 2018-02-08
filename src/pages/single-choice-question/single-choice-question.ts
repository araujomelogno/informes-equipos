import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {SurveyHolder} from '../../services/SurveyHolder';
import {Question} from '../../models/questions/Question';

/*
  Generated class for the SingleChoiceQuestion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-single-choice-question',
  templateUrl: 'single-choice-question.html'
})
export class SingleChoiceQuestionPage {
    surveyHolder: SurveyHolder;
  
    options: { key: string, value: string }[] = [];
    constructor(public nav: NavController, public navParams: NavParams) {
        debugger;
        this.surveyHolder = this.navParams.get('surveyHolder');
        this.options = (<Question>this.surveyHolder.currentQuestion).options;

    }

    next() {
        debugger; 
        this.surveyHolder.next();
    }

    prev() { 
        this.surveyHolder.prev();
    }

}
