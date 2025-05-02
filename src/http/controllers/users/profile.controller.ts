import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserProfile } from '../../../factories/make-get-user-profile';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfile();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
