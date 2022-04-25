import { SurveyModel } from '@/domain/models/survey'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    date: new Date(),
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
}

export const mockSurveysModels = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    date: new Date(),
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }, {
    id: 'other_id',
    question: 'other_question',
    date: new Date(),
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }]
  }]
}
