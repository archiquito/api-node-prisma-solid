import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verifyJwt';
import { createGyms } from './gym.controller';
import { searchGyms } from './search.controller';
import { nearByGyms } from './nearBy.controller';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
  app.post('./gym', createGyms);
  app.post('./gyms/search', searchGyms);
  app.post('./gyms/nearby', nearByGyms);
}
