import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { User } from '../src/users/user.entity'

jest.mock('../src/users/user.entity')


describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe());
    await app.init()

    // tip: access the database connection via
    // const connection = app.get(Connection)
    // const a = connection.manager
  })

  afterAll(async () => {
    await Promise.all([
      app.close(),
    ])
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  describe('Users url', () => {
    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
    })
    it('/users/profile (POST)', () => {
      const payload = {
        id: 7
      }
      return request(app.getHttpServer())
        .post('/users/profile')
        .send(payload)
        .expect(201)
    })
    it('/users/profile (POST) error bad request', () => {
      const payload = {
        id: ""
      }
      return request(app.getHttpServer())
        .post('/users/profile')
        .send(payload)
        .expect(400)
    })
    it('/users/:id (PUT)', () => {
      const payload = {
        id: 7,
        nama: "something"
      }
      return request(app.getHttpServer())
        .put(`/users/${payload.id}`)
        .send(payload)
        .expect(200)
    })
    it('/users/:id (PUT) error bad request', () => {
      const payload = {
        id: 7,
        nama: ""
      }
      return request(app.getHttpServer())
        .put(`/users/${payload.id}`)
        .send(payload)
        .expect(400)
    })
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
  })
  describe('Auth url', () => {
    it('/auth (Post)', () => {
      const payload = {
        username: "admin",
        password: "welcome@123"
      }
      return request(app.getHttpServer())
        .post('/auth')
        .send(payload)
        .expect(201)
    })
    it('/auth (Post) error unauthorized', () => {
      const payload = {
        username: "admin",
        password: "lala"
      }
      return request(app.getHttpServer())
        .post('/auth')
        .send(payload)
        .expect(401)
    })
  })

})
