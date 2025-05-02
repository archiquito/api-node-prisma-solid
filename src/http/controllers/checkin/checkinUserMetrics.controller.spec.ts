import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { createAndAuthUser } from '../../../utils/tests/createAndAuthuser';

describe('user Metrics CheckIns (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
    vi.useFakeTimers();
  });

  afterAll(async () => {
    await app.close();
    vi.useFakeTimers();
  });

  it('should be able to get list metrics CheckIn by UserId', async () => {
    const { token } = await createAndAuthUser(app);

    const gym = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Gym 1',
        description: 'Some description',
        phone: '1599999999',
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));
    await request(app.server)
      .post(`/checkin/gyms/${gym.body.gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    vi.setSystemTime(new Date(2025, 0, 2, 9, 0, 0));
    await request(app.server)
      .post(`/checkin/gyms/${gym.body.gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    const response = await request(app.server)
      .get(`/checkin/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.countCheckins).toEqual(2);
  });
});
