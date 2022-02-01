import { Validation } from './validation'
import { MissingParamError } from '../../errors'

export class RequiredFieldValidation implements Validation {
  private readonly fieldname: string

  constructor (fieldname: string) {
    this.fieldname = fieldname
  }

  validate (input: any): Error | null {
    if (!input[this.fieldname]) {
      return new MissingParamError(this.fieldname)
    }
    return null
  }
}
