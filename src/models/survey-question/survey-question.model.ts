import { SurveyAnswer } from '../survey-answer/survey-answer.model';

export class SurveyQuestion {
  questionId: number = null;
  surveyId: number = null;
  question: string = null;
  order: number = null;
  questionType: string = null;
  mandatory: number = null;

  answers: Array<SurveyAnswer> = [];
}
