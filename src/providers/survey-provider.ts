import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'; 
import { UserData } from '../providers/user-data';
import { SurveyDataModel } from '../models/SurveyDataModel';
import { ObtainedPrize } from '../models/ObtainedPrize';
import { Prize } from '../models/Prize';
import 'rxjs/add/operator/map';
/*
  Generated class for the SurveyProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SurveyProvider {

  constructor( public http: Http) {

  }

  getSurveyNames( userData:UserData) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/surveyNames', JSON.stringify({ user: userData.getCurrentUser().email }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });

  }


  getPrizesObtained( userData:UserData) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(userData);
    let p1 = new ObtainedPrize();
    p1.tittle  = "Premio  1";
    p1.points = 80;
    p1.description = "Este es el premio 1 ";
    p1.assigned = new Date(2017,10,20);
    let p2 = new ObtainedPrize();
    p2.tittle  = "Premio  2";
    p2.points = 40;
    p2.description = "Este es ";
    p2.assigned = new Date(2017,10,25);
    let result :Array<ObtainedPrize> = []
    result.push(p1);
    result.push(p2);
    return result;
    /*
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/completedSurveys', JSON.stringify({ user: userData.getCurrentUser().email }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });
    */
  }



  getPrizesCatalog( userData:UserData) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(userData);
    let p1 = new Prize();
    p1.tittle  = "Premio  1";
    p1.points = 80;
    p1.description = "Este es el premio 1 ";

    let p2 = new Prize();
    p2.tittle  = "Premio  2";
    p2.points = 40;
    p2.description = "Este es el premio 2 ";
    let result :Array<Prize> = []

    result.push(p1);
    result.push(p2);
    return result;
    /*
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/completedSurveys', JSON.stringify({ user: userData.getCurrentUser().email }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });
    */

  }



  getCompletedSurveys( userData:UserData) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/completedSurveys', JSON.stringify({ user: userData.getCurrentUser().email }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });

  }

  submitSurvey(userData:UserData,survey: SurveyDataModel, surveyStarted: Date, surveyEnded: Date, surveyAnswers: { questionLabel: String, answer: String }[]) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let statistics = {
        user: userData.getCurrentUser().email,
        studyId: survey.id,
        surveyTitle : survey.title,
        surveyDescription: survey.description,
        started: surveyStarted,
        ended: surveyEnded
      }
      this.http.post('https://equipos-pregunta.herokuapp.com/api/submitSurvey', JSON.stringify({ info: statistics, answerMap: surveyAnswers }), { headers: headers })
        .subscribe((res) => {
          resolve(res);
          console.log(res);
        }, (err) => {
          reject(err);
          console.log(err);
        });

    });

  }
  getSurvey(surveyId: any) {
    debugger;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise(resolve => {
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      this.http.post('https://equipos-pregunta.herokuapp.com/api/survey', JSON.stringify({ surveyId: surveyId }), { headers: headers })
        .map(res => res.json())
        .subscribe((data) => {
          debugger;
          resolve(data);
        });

    });

  }
}
