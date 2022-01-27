import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'

export class LoginController implements Controller {
  async handle (http: HttpRequest): Promise<HttpResponse> {
    if (!http.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
    if (!http.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    return new Promise(resolve => resolve({ statusCode: 200, body: {} }))
  }
}
