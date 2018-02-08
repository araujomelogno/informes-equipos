import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {SurveyHolder} from '../../services/SurveyHolder';

/*
  Generated class for the TextFieldQuestion page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-text-field-question',
  templateUrl: 'text-field-question.html'
})
export class TextFieldQuestionPage {
   surveyHolder: SurveyHolder;  
    constructor(public nav: NavController, public navParams: NavParams) {
        this.surveyHolder = this.navParams.get('surveyHolder');
    }

    next() { 
      this.surveyHolder.next();
    }

    prev() { 
      this.surveyHolder.prev();
    }


}
