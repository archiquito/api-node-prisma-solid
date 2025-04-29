import { FastifyInstance } from 'fastify';
import { createUsers } from './controllers/users.controller';
import { authenticate } from './controllers/authenticate.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUsers);
  app.post('/authenticate', authenticate);
}
