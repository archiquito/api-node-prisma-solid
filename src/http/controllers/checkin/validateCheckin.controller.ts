import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeValidateCheckIn } from '../../../factories/make-validate-checkin';

export async function validateCheckin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkinValidateParams = z.object({
    checkinId: z.string().uuid(),
  });

  const { checkinId } = checkinValidateParams.parse(request.params);

  const validate = makeValidateCheckIn();

  await validate.execute({
    checkinId,
  });

  return reply.status(204).send();
}
