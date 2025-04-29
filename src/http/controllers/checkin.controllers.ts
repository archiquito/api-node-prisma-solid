import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCheckIn } from '../../factories/make-checkin';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

export async function checkin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    userId: z.string(),
    gymId: z.string(),
    userLatitude: z.number(),
    userLongitude: z.number(),
  });

  const { userId, gymId, userLatitude, userLongitude } =
    registerBodySchema.parse(request.body);

  try {
    const checkIn = makeCheckIn();

    await checkIn.execute({
      userId,
      gymId,
      userLatitude,
      userLongitude,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      });
    }
    throw err;
  }

  return reply.status(201).send();
}
