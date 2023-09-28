import { mapUsersToRestModel, mapUserToRestModel } from './mapper'
import { Email, Name } from '../domain/User'
import { parseSchema } from '../infrastructure/schema'
import { app, endpoint } from '../infrastructure/rest'
import { Order } from '../domain/UserRepository'

app.post('/users', endpoint(async ({ req, res, dependencies: { userUseCases } }) => {
  const { name, email } = parseSchema({ name: Name.of, email: Email.of }, req.body)

  const user = await userUseCases.create(name, email)

  res.send(mapUserToRestModel(user)).status(201)
}))

app.get('/users', endpoint(async ({ req, res, dependencies: { userUseCases } }) => {
  const { createdAtOrder } = parseSchema({ createdAtOrder: Order.of }, req.query)

  const users = await userUseCases.findAll({ createdAt: createdAtOrder })

  res.send(mapUsersToRestModel(users)).status(200)
}))
