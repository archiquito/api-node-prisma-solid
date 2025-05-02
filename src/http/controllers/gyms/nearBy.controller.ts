import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeFetchGymNearBy } from '../../../factories/make-fetch-gym-nearby';

export async function nearByGyms(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = registerBodySchema.parse(request.query);

  const nearByGym = makeFetchGymNearBy();

  const { gyms } = await nearByGym.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
