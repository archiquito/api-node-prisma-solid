import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';
import { createAndAuthUser } from '../../../utils/tests/createAndAuthuser';

describe('Validate CheckIn (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to validate CheckIn from userId', async () => {
    const { token } = await createAndAuthUser(app);

    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Gym',
        description: 'Some description',
        phone: '1599999999',
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    const responseCheckin = await request(app.server)
      .post(`/checkin/gyms/${gymResponse.body.gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.5337923,
        longitude: -47.579136,
      });

    const response = await request(app.server)
      .patch(`/checkin/validate/${responseCheckin.body.checkIn.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
