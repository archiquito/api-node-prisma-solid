import { FastifyInstance } from 'fastify';
import { createUsers } from './controllers/users.controller';
import { authenticate } from './controllers/authenticate.controller';
import { profile } from './controllers/profile.controller';
import { verifyJwt } from './middlewares/verifyJwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createUsers);
  app.post('/authenticate', authenticate);

  /** AUTHENTICATED */
  app.get('/profile', { onRequest: [verifyJwt] }, profile);
}
