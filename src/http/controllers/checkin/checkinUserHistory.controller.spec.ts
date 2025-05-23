import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { createAndAuthUser } from '../../../utils/tests/createAndAuthuser';
import { prisma } from '../../../lib/prisma';

describe('History CheckIns (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get list history CheckIn by UserId', async () => {
    const { token } = await createAndAuthUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          user_id: user.id,
        },
        {
          gymId: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get('/checkin/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.historyCheckins).toEqual([
      expect.objectContaining({
        gymId: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gymId: gym.id,
        user_id: user.id,
      }),
    ]);
  });
});
