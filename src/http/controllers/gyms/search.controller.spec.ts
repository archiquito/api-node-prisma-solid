import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { createAndAuthUser } from '../../../utils/tests/createAndAuthuser';

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get search gyms by query (title)', async () => {
    const { token } = await createAndAuthUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Gym',
        description: 'Some description',
        phone: '1599999999',
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some description',
        phone: '1599999999',
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Javascript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ]);
  });
});
