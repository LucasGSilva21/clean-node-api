import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldname: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldname])
    if (!isValid) {
      return new InvalidParamError(this.fieldname)
    }
    return null
  }
}
