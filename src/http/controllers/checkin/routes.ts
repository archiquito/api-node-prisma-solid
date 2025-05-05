import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../middlewares/verifyJwt';
import { createCheckin } from './create.controller';
import { checkinHistory } from './checkinUserHistory.controller';
import { validateCheckin } from './validateCheckin.controller';
import { checkinMetrics } from './newCheckinUserMetrics.controller';
import { verifyUserRole } from '../../middlewares/verifyUserRole';

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/checkin/history', checkinHistory);
  app.get('/checkin/metrics', checkinMetrics);

  app.post('/checkin/gyms/:gymId', createCheckin);
  app.patch(
    '/checkin/validate/:checkinId',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckin,
  );
}
