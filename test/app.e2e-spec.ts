import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { ContentsModule } from '../src/contents/contents.module';

jest.mock('@nestjs/jwt');
jest.mock('../src/users/user.entity')
jest.mock('../src/contents/content.entity')

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule, AuthModule, ContentsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });
  it("should get all users", () => {
    return request(app.getHttpServer())
      .get("/users")
      .set("Accept", "application/json")
      .expect(HttpStatus.OK);

  });
});