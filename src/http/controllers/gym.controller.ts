import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { makeCreateNewGym } from '../../factories/make-create-new-gym';

export async function checkin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    phone: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const { title, description, phone, latitude, longitude } =
    registerBodySchema.parse(request.body);

  try {
    const gym = makeCreateNewGym();

    await gym.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
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
