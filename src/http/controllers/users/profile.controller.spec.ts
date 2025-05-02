import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';

describe('Profile User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get profile user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@teste.com',
      password: '123456',
    });

    const authResponse = await request(app.server).post('/authenticate').send({
      email: 'john@teste.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: 'john@teste.com' }),
    );
  });
});
