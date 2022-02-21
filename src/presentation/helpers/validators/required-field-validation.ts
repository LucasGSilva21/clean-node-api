import { Validation } from '../../protocols/validation'
import { MissingParamError } from '../../errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldname: string) {}

  validate (input: any): Error | null {
    if (!input[this.fieldname]) {
      return new MissingParamError(this.fieldname)
    }
    return null
  }
}
