import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCheckIn } from '../../../factories/make-checkin';

export async function createCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkinParams = z.object({
    gymId: z.string().uuid(),
  });

  const registerBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { gymId } = checkinParams.parse(request.params);
  const { latitude, longitude } = registerBodySchema.parse(request.body);

  const gym = makeCheckIn();

  const { checkIn } = await gym.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({
    checkIn,
  });
}
