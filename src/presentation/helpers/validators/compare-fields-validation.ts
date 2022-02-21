import { Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldname: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | null {
    if (input[this.fieldname] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
    return null
  }
}
