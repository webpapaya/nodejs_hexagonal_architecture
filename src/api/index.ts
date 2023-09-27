import express, {Express, Request, Response} from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {withPostgres} from "../infrastructure/persistence/connection";
import {UserPostgresRepository} from "../infrastructure/persistence/UserPostgresRepository";
import {UserUseCases} from "../use-cases/UserUseCases";

dotenv.config();

const app: Express = express();
app.use(cors())
  .use(express.json())
  .options('*', cors());

app.post('/users', async (req: Request, res: Response) => {
  await withPostgres(async (client) => {
    const userRepository = new UserPostgresRepository(client)
    const userUseCases = new UserUseCases(userRepository)

    const user = await userUseCases.create(req.body.name, req.body.email);

    res.send(user).status(201)
  })
});

app.get('/users', async (req: Request, res: Response) => {
  await withPostgres(async (client) => {
    const userRepository = new UserPostgresRepository(client)
    res.send(await userRepository.findAll()).status(200)
  })
});

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
