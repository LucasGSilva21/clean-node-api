import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<string> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }, {
        answer: 'other_answer'
      }
    ],
    date: new Date()
  })
  return res.insertedId.toHexString()
}
const makeAccount = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  return res.insertedId.toHexString()
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const surveyId = await makeSurvey()
      const accountId = await makeAccount()
      const sut = makeSut()
      await sut.save({
        surveyId,
        accountId,
        answer: 'any_answer',
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: ObjectId.createFromHexString(surveyId),
        accountId: ObjectId.createFromHexString(accountId)
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const surveyId = await makeSurvey()
      const accountId = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: ObjectId.createFromHexString(surveyId),
        accountId: ObjectId.createFromHexString(accountId),
        answer: 'any_answer',
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId,
        accountId,
        answer: 'other_answer',
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.find({
        surveyId: ObjectId.createFromHexString(surveyId),
        accountId: ObjectId.createFromHexString(accountId)
      }).toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
      expect(surveyResult[0].answer).toBe('other_answer')
    })
  })
})
