import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verifyJwt';
import { createCheckin } from './create.controller';
import { checkinHistory } from './checkinUserHistory.controller';
import { checkinMetrics } from './checkinUserMetrics.controller';
import { validateCheckin } from './validateCheckin.controller';

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/checkin/history', checkinHistory);
  app.get('/checkin/metrics', checkinMetrics);

  app.post('/checkin/gyms/:gymId', createCheckin);
  app.patch('/checkin/validate/:checkinId', validateCheckin);
}
