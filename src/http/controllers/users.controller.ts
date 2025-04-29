import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ErrorUserEmailExists } from '../../errors/error.user-email-exists';
import { makeCreateNewUser } from '../../factories/make-create-new-user';

export async function createUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const createNewUser = makeCreateNewUser();

    await createNewUser.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof ErrorUserEmailExists) {
      return reply.status(409).send({
        message: err.message,
      });
    }
    throw err;
  }

  return reply.status(201).send();
}
