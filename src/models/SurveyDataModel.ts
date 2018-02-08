import { Question } from './questions/Question';

export class SurveyDataModel {
    _id: any;
    id: number;
   
    questions: Question[];
    constructor(public client:string,public title:string ,public  description:string) {
          
        this.questions = [];
    }

}
