import { AddAccount, AddAccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from '@/data/usecases/account/add-account/db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<boolean | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const isValid = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return isValid
    }
    return null
  }
}
