import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

let app: INestApplication;
let dataSource: DataSource;

export const initTestApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();

  dataSource = moduleFixture.get(DataSource);

  return app;
};

export const closeTestApp = async () => {
  await dataSource.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`);
  await app.close();
};
