import {QuestionJump} from './QuestionJump';
export class Question {
    questionType: string;
    answer: any; //the answer
    label: string;
    title: string;
    content: string;
    required: boolean;
    number: number;
    showVideo: boolean;
    videoUrl: string;
    showImage: boolean;
    image: any;
    minRange: number;
    maxRange: number;
    minLabel: string;
    maxLabel: string;
    options: { key: string, value: string, answer: any }[] = [];
    rows: { key: string, value: string, answer: any }[] = [];
    jumps : [QuestionJump];
    constructor(
        public params: {
            answer?: any,
            content?: string,
            title?: string,
            label?: string,
            required?: boolean,
            number?: number,
            showVideo?: boolean,
            videoUrl?: string,
            image?: any,
            showImage?: boolean,
            controlType?: string,
            minRange?: number,
            maxRange?: number,
            minLabel?: string,
            maxLabel?: string

        } = {}
    ) {
        this.answer = params.answer;
        this.title = params.title || '';
        this.content = params.content || '';
        this.label = params.label || '';
        this.showImage = params.showImage || false;
        this.showVideo = params.showVideo || false;
        this.image = params.image || null;
        this.videoUrl = params.videoUrl || '';
        this.required = params.required ||false;
        this.number = params.number === undefined ? 1 : params.number;
        this.minRange = params.minRange === undefined ? 1 : params.minRange;
        this.maxRange = params.maxRange === undefined ? 100 : params.maxRange;
        this.questionType = params.controlType || '';
        this.maxLabel = params.maxLabel || '';
        this.minLabel = params.minLabel || '';
    }
}

