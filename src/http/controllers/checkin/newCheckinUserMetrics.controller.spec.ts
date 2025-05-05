import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { createAndAuthUser } from '../../../utils/tests/createAndAuthuser';
import { prisma } from '../../../lib/prisma';

describe('user Metrics CheckIns (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get list metrics CheckIn by UserId', async () => {
    const { token } = await createAndAuthUser(app, true);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: null,
        phone: null,
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
      .get('/checkin/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.countCheckins).toEqual(2);
  });
});
