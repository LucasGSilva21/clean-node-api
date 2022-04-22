import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from '@/main/factories/controllers/surveys/add-survey/add-survey-validation-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeDbAddSurvey(), makeAddSurveyValidation())
  return makeLogControllerDecorator(controller)
}
