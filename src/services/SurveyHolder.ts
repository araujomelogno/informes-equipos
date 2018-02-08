import { Injectable } from '@angular/core';
import { SurveyDataModel } from '../models/SurveyDataModel';


import { MenuController, NavController, LoadingController, ActionSheetController, ToastController, AlertController } from 'ionic-angular';
import { Question } from '../models/questions/Question';
import { HomePage } from '../pages/home/home';
import { TextBoxQuestionPage } from '../pages/text-box-question/text-box-question';
import { SingleChoiceQuestionPage } from '../pages/single-choice-question/single-choice-question';
import { MultipleChoiceQuestionPage } from '../pages/multiple-choice-question/multiple-choice-question';
import { RangeQuestionPage } from '../pages/range-question/range-question';
import { GridQuestionPage } from '../pages/grid-question/grid-question';
import { TextFieldQuestionPage } from '../pages/text-field-question/text-field-question';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthProvider } from '../providers/auth/auth';
import { UserData } from '../providers/user-data';
import { SurveyProvider } from '../providers/survey-provider';
@Injectable()
export class SurveyHolder {
    currentQuestionIndex: number = 0;
    survey: SurveyDataModel;
    currentQuestion: Question;
    surveyAnswers: { questionLabel: String, answer: String }[] = [];

    surveyStarted: Date;
    surveyEnded: Date;
    nav: NavController;
    constructor(public menu: MenuController, public userData: UserData,
        public surveyProvider: SurveyProvider, public loadingController: LoadingController,
        public authProvider: AuthProvider, public alertCtrl: AlertController,
        public http: Http,
        public toastCtrl: ToastController, public actionController: ActionSheetController) {
    }

    setStarted(started: Date) {
        this.surveyStarted = started;
    }
    setCurrentQuestionIndex(index: number) {
        this.currentQuestionIndex = index;
    }
    setSetAnswers(surveyAns: any) {
        this.surveyAnswers = surveyAns;
    }
    setCurrentQuestion(question: Question) {
        this.currentQuestion = question;
    }
    setSurvey(asurvey: SurveyDataModel) {
        debugger;
        this.survey = asurvey;
        this.currentQuestion = this.survey.questions[0];
    }
    getSurveyDataToLocallyPersist() {
        return {
            survey: this.survey,
            currentQuestion: this.currentQuestion,
            surveyAnswers: this.surveyAnswers,
            currentQuestionIndex: this.currentQuestionIndex,
            surveyStarted: this.surveyStarted
        };
    }

    setNav(anav: NavController) {
        this.nav = anav;
    }

    startSurvey() {
        if (this.surveyStarted == null)
            this.surveyStarted = new Date();
        if (this.survey.questions != null && this.survey.questions.length > 0) {
            this.menu.enable(false, 'loggedInMenu');
            this.menu.enable(true, 'surveyMenu');
            this.gotoQuestion();
        } else {
            let toast = this.toastCtrl.create({
                message: 'No fue posible acceder a la encuesta',
                duration: 3000
            });
            toast.present();
        }
    }

    enableInSurveyMenu() {
        this.menu.enable(false, 'loggedInMenu');
        this.menu.enable(true, 'surveyMenu');
    }

    gotoQuestion() {
        debugger;
        this.currentQuestion = this.survey.questions[this.currentQuestionIndex];

        if (this.currentQuestion.questionType == 'textbox') {
            this.nav.setRoot(TextBoxQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'textfield') {
            this.nav.setRoot(TextFieldQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'multiple-choice') {
            this.nav.setRoot(MultipleChoiceQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'single-choice') {
            this.nav.setRoot(SingleChoiceQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'range') {
            this.nav.setRoot(RangeQuestionPage, { surveyHolder: this });
        } else if (this.currentQuestion.questionType == 'grid') {
            this.nav.setRoot(GridQuestionPage, { surveyHolder: this });
        }

    }
    getAnswer(questionlabel: string) {
        for (let entry of this.surveyAnswers) {
            if (entry.questionLabel == questionlabel) {
                return entry.answer;
            }
        }
        return '';
    }
    next() {

        let jumpDestinationLabel = '';
        if (this.survey.questions[this.currentQuestionIndex].jumps != null && this.survey.questions[this.currentQuestionIndex].jumps.length > 0) {
            let index = 0;
            let currentQuestionAnwer = this.getAnswer(this.survey.questions[this.currentQuestionIndex].label);
            while (index < this.survey.questions[this.currentQuestionIndex].jumps.length &&
                jumpDestinationLabel == '') {
                let jump = this.survey.questions[this.currentQuestionIndex].jumps[index];
                let answer: String = '';
                if (jump.comparissonValue != null) {
                    answer = jump.comparissonValue;
                } else {
                    answer = this.getAnswer(jump.comparissonLabel);
                }
                if (jump.conditionOperator == '==') {
                    if (currentQuestionAnwer == answer) {
                        jumpDestinationLabel = this.survey.questions[this.currentQuestionIndex].label;
                    }

                } else if (jump.conditionOperator == '>') {
                    if (currentQuestionAnwer > answer) {
                        jumpDestinationLabel = this.survey.questions[this.currentQuestionIndex].label;
                    }
                } else if (jump.conditionOperator == '<') {
                    if (currentQuestionAnwer < answer) {
                        jumpDestinationLabel = this.survey.questions[this.currentQuestionIndex].label;
                    }
                } else if (jump.conditionOperator == '!=') {
                    if (currentQuestionAnwer != answer) {
                        jumpDestinationLabel = this.survey.questions[this.currentQuestionIndex].label;
                    }
                }
                index = index + 1;
            }

        }
        if (jumpDestinationLabel != '') {
            let aux = this.getQuestionIndex(jumpDestinationLabel);
            if (aux != -1) {
                this.currentQuestionIndex = aux;
            }
        } else {
            this.currentQuestionIndex = this.currentQuestionIndex + 1;
        }
        if (this.survey.questions[this.currentQuestionIndex] != null) {
            this.gotoQuestion();
        } else {
            this.endSurvey();
        }
    }

    getQuestionIndex(jumpDestinationLabel: String) {
        let index = 0;
        for (let question of this.survey.questions) {
            if (question.label == jumpDestinationLabel) {
                return index;
            }
            index = index + 1;
        }
        return -1;
    }
    prev() {
        this.currentQuestionIndex = this.currentQuestionIndex - 1;
        this.gotoQuestion();
    }

    endSurvey() {
        this.surveyEnded = new Date();
        this.surveyAnswers = [];
        for (let question of this.survey.questions) {
            this.surveyAnswers.push({ questionLabel: question.label, answer: question.answer });
        }
        this.submitSurvey();

    }



    submitSurvey() {

        console.log('Terminando encuesta');
        let actionSheet = this.actionController.create({
            title: 'Terminar encuesta',
            subTitle: '¿Desea terminar encuesta?',
            buttons: [
                {
                    text: 'Si',
                    handler: () => {

                        let loading = this.loadingController.create({
                            content: "Subiendo Encuesta"
                        });

                        loading.present();
                        this.surveyProvider.submitSurvey(this.userData, this.survey, this.surveyStarted, this.surveyEnded, this.surveyAnswers).then(

                            (res) => {
                                loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Equipos Pregunta',
                                    subTitle: 'Encuesta subida con éxito',
                                    buttons: [{
                                        text: 'OK',
                                        handler: () => {
                                            this.menu.enable(false, 'surveyMenu');
                                            this.menu.enable(true, 'loggedInMenu');
                                            this.nav.setRoot(HomePage);
                                        }
                                    }]
                                });
                                alert.present();
                                console.log(res);
                            }, (err) => {
                                loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: 'Equipos Pregunta',
                                    subTitle: 'Error al subir la encueta',
                                    buttons: [{
                                        text: 'cancel',
                                        role: 'canel'

                                    }]
                                });
                                alert.present();
                                console.log(err);
                            });



                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]

        });

        actionSheet.present();

    }




}
