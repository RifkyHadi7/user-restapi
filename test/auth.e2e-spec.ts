import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestApp, closeTestApp } from './setup';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await initTestApp();

    await request(app.getHttpServer()).post('/users/register').send({
      username: 'authuser',
      email: 'auth@example.com',
      password: 'password123',
    });
  });

  afterAll(async () => {
    await closeTestApp();
  });

  it('should login successfully and return JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'auth@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Login successful');
    expect(response.body.data).toHaveProperty('access_token');
    accessToken = response.body.data.access_token;
  });

  it('should fail login with wrong credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        identifier: 'auth@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Authentication failed');
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });

  it('should get user profile with valid JWT token', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'User profile decoded from JWT');
    expect(response.body.data).toHaveProperty('username', 'authuser');
  });

  it('should reject access without token to profile', async () => {
    const response = await request(app.getHttpServer()).get('/auth/profile');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
    expect(response.body).toHaveProperty('error', 'No authentication token provided');
  });

  it('should reject unauthorized access to profile', async () => {
    const response = await request(app.getHttpServer()).get('/auth/profile').set('Authorization', 'Bearer 1235123');;

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Unauthorized');
    expect(response.body).toHaveProperty('error', 'Invalid or expired token');
  });
});
