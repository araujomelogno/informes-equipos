import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { SurveyHolder } from '../../services/SurveyHolder';
/*
  Generated class for the TextBoxQuestion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-text-box-question',
    templateUrl: 'text-box-question.html'
})
export class TextBoxQuestionPage {
    surveyHolder: SurveyHolder;
    constructor(public nav: NavController, public navParams: NavParams) {

        this.surveyHolder = this.navParams.get('surveyHolder');
        if (this.surveyHolder.currentQuestion.answer == null) {
            this.surveyHolder.currentQuestion.answer = '';
        }
    }

    next() {
        this.surveyHolder.next();
    }

    prev() {
        this.surveyHolder.prev();
    }
}
