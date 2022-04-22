import { makeLoginValidation } from '@/main/factories/controllers/auth/login/login-validation-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/auth/login/login-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const dbAuthentication = makeDbAuthentication()
  const controller = new LoginController(dbAuthentication, makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
