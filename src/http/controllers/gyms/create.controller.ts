import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateNewGym } from '../../../factories/make-create-new-gym';

export async function createGyms(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { title, description, phone, latitude, longitude } =
    registerBodySchema.parse(request.body);

  const createNewGym = makeCreateNewGym();

  const { gym } = await createNewGym.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(201).send({
    gym,
  });
}
