import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SurveyHolder } from '../../services/SurveyHolder';
import { Question } from '../../models/questions/Question'
/* 
  Generated class for the GridQuestion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-grid-question',
    templateUrl: 'grid-question.html'
})
export class GridQuestionPage {
    surveyHolder: SurveyHolder;
    answer: string = '';
    constructor(public nav: NavController, public navParams: NavParams) {
        this.surveyHolder = this.navParams.get('surveyHolder');
        debugger;
    }

    next() {
        debugger;
        let answers: string[] = [];
        for (let option of (<Question>this.surveyHolder.currentQuestion).rows) {
            let rowAnswer = option.key + "->";
            if (option.answer != null)
                for (let answer of option.answer) {
                    rowAnswer = rowAnswer + answer + ",";
                }
            rowAnswer = rowAnswer + "|";
            answers.push(rowAnswer);
        }
        this.surveyHolder.currentQuestion.answer = answers;
        this.surveyHolder.next();
    }

    prev() {
        debugger;

        let answers: string[] = [];
        for (let option of (<Question>this.surveyHolder.currentQuestion).rows) {
            let rowAnswer = option.key + "->";
            if (option.answer != null)
                for (let answer of option.answer) {
                    rowAnswer = rowAnswer + answer + ",";
                }
            rowAnswer = rowAnswer + "|";
            answers.push(rowAnswer);
        }
        this.surveyHolder.currentQuestion.answer = answers;
        this.surveyHolder.prev();
    }
}
