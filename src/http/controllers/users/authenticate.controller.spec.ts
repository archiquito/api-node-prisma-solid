import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../../app';

describe('Authenticate User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@teste.com',
      password: '123456',
    });

    const response = await request(app.server).post('/authenticate').send({
      email: 'john@teste.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
