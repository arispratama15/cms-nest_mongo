import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { ContentsModule } from '../src/contents/contents.module';
import * as request from 'supertest';
import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';
import { CreateUserDto, UpdateUserDto, GetOneItemDto, DeleteItem } from '../src/users/dto/user.dto';
import { AuthLoginDto } from '../src/auth/dto/auth-login.dto';
import { CreateContentDto, UpdateContentDto } from '../src/contents/dto/content.dto';

// jest.mock('../src/users/users.module')
jest.mock('../src/users/user.entity')
jest.mock('@nestjs/jwt');
jest.mock('../src/contents/content.entity')
// jest.mock('../src/auth/auth.module')

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule, AuthModule, ContentsModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });
  describe('Users url', () => {
    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
    });
  })
  describe('Auth url', () => {
    it('/login (GET)', () => {
      const payload: AuthLoginDto = {
        username: "admin",
        password: "welcome@123"
      };
      return request(app.getHttpServer())
        .post('/auth')
        .send(payload)
        .expect(201)
    });
  })
  describe('Contents url', () => {
    it('/contents (GET)', () => {
      return request(app.getHttpServer())
        .get('/contents')
        .expect(200)
    });
  })
});
