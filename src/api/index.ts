import express, {Express, Request, Response} from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {withDependencies} from "../infrastructure/dependencies";
import {mapUsersToRestModel, mapUserToRestModel} from "./mapper";

dotenv.config();

const app: Express = express();
app.use(cors())
  .use(express.json())
  .options('*', cors());

app.post('/users', async (req: Request, res: Response) => withDependencies(async ({ userUseCases }) => {
  const user = await userUseCases.create(req.body.name, req.body.email);

  res.send(mapUserToRestModel(user)).status(201)
}));

app.get('/users', async (req: Request, res: Response) => withDependencies(async ({ userUseCases }) => {
  const users = await userUseCases.findAll();

  res.send(mapUsersToRestModel(users)).status(200)
}));

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
