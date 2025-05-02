import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeFetchUserCheckInHistory } from '../../../factories/make-fetch-user-checkin-history';

export async function checkinHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = registerBodySchema.parse(request.query);

  const fetchHistoryCheckins = makeFetchUserCheckInHistory();

  const { historyCheckins } = await fetchHistoryCheckins.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    historyCheckins,
  });
}
