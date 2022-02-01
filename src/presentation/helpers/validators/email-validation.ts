import { Validation } from './validation'
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  private readonly fieldname: string
  private readonly emailValidator: EmailValidator

  constructor (fieldname: string, emailValidator: EmailValidator) {
    this.fieldname = fieldname
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldname])
    if (!isValid) {
      return new InvalidParamError(this.fieldname)
    }
    return null
  }
}
