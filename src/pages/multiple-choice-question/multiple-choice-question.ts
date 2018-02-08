import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
  
import {SurveyHolder} from '../../services/SurveyHolder';
import {Question} from '../../models/questions/Question';
 
@Component({
  selector: 'page-multiple-choice-question',
  templateUrl: 'multiple-choice-question.html'
})
export class MultipleChoiceQuestionPage {
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
