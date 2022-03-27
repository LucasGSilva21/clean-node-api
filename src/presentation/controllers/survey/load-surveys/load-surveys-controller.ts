import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-controller-protocols'
import { noContent } from '../../../helpers/http/http-helper'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return noContent()
  }
}