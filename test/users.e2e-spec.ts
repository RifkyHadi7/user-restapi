import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { initTestApp, closeTestApp } from './setup';

describe('User Registration (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body.data).toHaveProperty('email', 'test@example.com');
  });

  it('should fail when email is already registered', async () => {
    await request(app.getHttpServer()).post('/users/register').send({
      username: 'testuser2',
      email: 'test@example.com',
      password: 'password123',
    });

    const response = await request(app.getHttpServer()).post('/users/register').send({
      username: 'testuser3',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'User registration failed');
    expect(response.body).toHaveProperty('error','duplicate key value violates unique constraint \"UQ_97672ac88f789774dd47f7c8be3\"');
  });
});
