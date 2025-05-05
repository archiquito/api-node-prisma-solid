import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { prisma } from '../../lib/prisma';

export async function createAndAuthUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@teste.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  });
  const authResponse = await request(app.server).post('/authenticate').send({
    email: 'john@teste.com',
    password: '123456',
  });

  const { token } = authResponse.body;

  return { token };
}
