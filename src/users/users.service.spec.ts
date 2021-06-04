import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import {User} from './user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
          provide: getRepositoryToken(User),
          useValue: {}
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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
