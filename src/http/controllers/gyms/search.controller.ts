import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeSearchGym } from '../../../factories/make-search-gym';

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = registerBodySchema.parse(request.query);

  const searchGym = makeSearchGym();

  const { gyms } = await searchGym.execute({ query, page });

  return reply.status(200).send({
    gyms,
  });
}
