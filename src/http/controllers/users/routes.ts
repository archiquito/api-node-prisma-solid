import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verifyJwt';
import { createUsers } from './create.controller';
import { authenticate } from './authenticate.controller';
import { profile } from './profile.controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUsers);
  app.post('/authenticate', authenticate);

  /** AUTHENTICATED */
  app.get('/profile', { onRequest: [verifyJwt] }, profile);
}
