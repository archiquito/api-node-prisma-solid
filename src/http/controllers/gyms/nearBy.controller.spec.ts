import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { createAndAuthUser } from '../../../utils/tests/createAndAuthuser';

describe('Search Near By Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get near by gyms', async () => {
    const { token } = await createAndAuthUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near gym',
        description: 'gym to dev code',
        phone: '98123456',
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far gym',
        description: 'gym to dev code',
        phone: '98123456',
        latitude: -23.4045811,
        longitude: -47.2599396,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.5337923,
        longitude: -47.579136,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Near gym' }),
    ]);
  });
});
