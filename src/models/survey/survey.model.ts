import { SurveyQuestion } from '../survey-question/survey-question.model';

export class Survey {
  id: number = null;
  name: string = null;
  validFrom: Date = null;
  validTo: Date = null;
  order: number = null;
  trigger: string = null;

  questions: Array<SurveyQuestion> = [];
}
