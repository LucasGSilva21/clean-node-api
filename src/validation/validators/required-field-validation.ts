import { Validation } from '../../presentation/protocols/validation'
import { MissingParamError } from '../../presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldname: string) {}

  validate (input: any): Error | null {
    if (!input[this.fieldname]) {
      return new MissingParamError(this.fieldname)
    }
    return null
  }
}
