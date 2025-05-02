import { FastifyRequest, FastifyReply } from 'fastify';
import { makeCheckInUserMetrics } from '../../../factories/make-get-user-metrics';

export async function checkinMetrics(request: FastifyRequest, reply: FastifyReply) {
  const fetchMetricsCheckins = makeCheckInUserMetrics();

  const { countCheckins } = await fetchMetricsCheckins.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    countCheckins,
  });
}
