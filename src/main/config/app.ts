import express, { Express } from 'express'
import setupMiddlewares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'
import setupSwagger from '@/main/config/swagger'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
