import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verifyJwt';
import { createGyms } from './create.controller';
import { searchGyms } from './search.controller';
import { nearByGyms } from './nearBy.controller';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
  app.post('/gyms', createGyms);
  app.get('/gyms/search', searchGyms);
  app.get('/gyms/nearby', nearByGyms);
}
