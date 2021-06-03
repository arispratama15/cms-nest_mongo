import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  let mockUserService = {
    create: jest.fn(dto => {
      return {
        ...dto
      }
    }),
    findByUsername: jest.fn(dto => {
      return {
        message: "User already exist"
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an user', () => {
    const payload = {
      nama: "aris",
      username: "aris",
      password: "welcome@123",
      isAdmin: true
    };
    expect(controller.addUser(payload)).toEqual(payload)
  })

  it('Should throw exception user not found', async () => {
    const payload = {
      nama: "admin",
      username: "admin",
      password: "welcome@123",
      isAdmin: true
    };
    jest.spyOn(service, 'findByUsername').mockRejectedValueOnce(new Error('User already exist'));
  });
});
