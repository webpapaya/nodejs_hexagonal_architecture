import express, { type Express, type Request, type Response } from 'express'
import { type Dependencies, withDependencies } from './dependencies'
import { DomainError } from '../domain/DomainErrors'
import * as dotenv from 'dotenv'
import cors from 'cors'

export const endpoint = <T>(callback: (args: { req: Request, res: Response, dependencies: Dependencies }) => T) => {
  return async (req: Request, res: Response) => await withDependencies(async (dependencies) => {
    try {
      return callback({ req, res, dependencies })
    } catch (e) {
      if (e instanceof DomainError) {
        console.info(e)
        res.send({ error: e.message }).status(403)
      } else {
        console.error(e)
        res.send({ error: 'Internal server error' }).status(500)
      }
    }
  })
}

dotenv.config()

export const app: Express = express()
app.use(cors())
  .use(express.json())
  .options('*', cors())

const port = process.env.PORT ?? 3111
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
