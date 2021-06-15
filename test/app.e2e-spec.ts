import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  describe('Users url', () => {
    it('/users (POST) register', () => {
      const payload = {
        nama: 'test',
        username: 'test',
        password: 'test',
        isAdmin: false,
      };
      return request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(201);
    });
    it('/users (GET)', () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });
    it('/users/profile (POST)', () => {
      const payload = {
        id: 1,
      };
      return request(app.getHttpServer())
        .post('/users/profile')
        .send(payload)
        .expect(201);
    });
    it('/users/profile (POST) error bad request', () => {
      const payload = {
        id: '',
      };
      return request(app.getHttpServer())
        .post('/users/profile')
        .send(payload)
        .expect(400);
    });
    it('/users/:id (PUT)', () => {
      const payload = {
        id: 1,
        nama: 'admin',
      };
      return request(app.getHttpServer())
        .put(`/users/${payload.id}`)
        .send(payload)
        .expect(200);
    });
    it('/users/:id (PUT) error bad request', () => {
      const payload = {
        id: 1,
        nama: '',
      };
      return request(app.getHttpServer())
        .put(`/users/${payload.id}`)
        .send(payload)
        .expect(400);
    });
    // it('/users/:id (DELETE)', () => {
    //   const payload = {
    //     id: 7,
    //   }
    //   return request(app.getHttpServer())
    //     .put(`/users/${payload.id}`)
    //     .send(payload)
    //     .expect(200)
    // })
    // it('/users/:id (PUT) error bad request', () => {
    //   const payload = {
    //     id: 7,
    //     nama: ""
    //   }
    //   return request(app.getHttpServer())
    //     .put(`/users/${payload.id}`)
    //     .send(payload)
    //     .expect(400)
    // })
  });
  describe('Auth url', () => {
    it('/auth (Post)', () => {
      const payload = {
        username: 'admin',
        password: 'admin',
      };
      return request(app.getHttpServer())
        .post('/auth')
        .send(payload)
        .expect(201);
    });
    it('/auth (Post) error unauthorized', () => {
      const payload = {
        username: 'admin',
        password: 'password',
      };
      return request(app.getHttpServer())
        .post('/auth')
        .send(payload)
        .expect(401);
    });
  });
});
