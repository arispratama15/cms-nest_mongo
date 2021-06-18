import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './users.model';

// jest.mock('./user.model');

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    function mockUserModel() {
      this.user = {
        id: '1',
        nama: '',
        username: '',
        password: '',
        isAdmin: true,
      };
      this.save = () => {
        return this.user;
      };
      this.find = () => {
        return;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userModel = module.get<Model<User>>(getModelToken('User'));
    service = module.get<UsersService>(UsersService);
  });

  describe('Create User', () => {
    it('should create a new user then return it', async () => {
      const hashedPassword = jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(async () => hashedPassword);
      const newUser = new userModel({
        nama: '',
        username: '',
        password: hashedPassword,
        isAdmin: true,
      });

      await newUser.save();
      expect(await service.createOneUser(new CreateUserDto())).toBe('1');
    });
  });
  describe('Get all users', () => {
    it('should find all users', async () => {
      const result: User[] = [];
      jest.spyOn(service, 'getAllUsers').mockResolvedValueOnce(result);

      expect(await service.getAllUsers()).toBe(result);
    });
  });
  // describe('User find by ID', () => {
  //   it('should find an user by ID', async () => {
  //     const user = new User();
  //     user.id = 1;

  //     jest.spyOn(User, 'findOne').mockImplementation(async () => user);

  //     const getOneItemDto = new GetOneItemDto();
  //     const findUser = (await service.findById(
  //       getOneItemDto,
  //     )) as unknown as User;

  //     expect(findUser.id).toBe(user.id);
  //   });
  // });
  // describe('Update an user', () => {
  //   it('should update an user by ID', async () => {
  //     const user = new User();
  //     user.id = 1;
  //     user.nama = '';

  //     let result;

  //     jest.spyOn(User, 'update').mockImplementation(async () => result);

  //     const updateUserDto = new UpdateUserDto();
  //     const updateUser = (await service.update(
  //       updateUserDto,
  //     )) as unknown as User;

  //     expect(updateUser).toBe(result);
  //   });
  // });
  // describe('Delete an user', () => {
  //   it('should delete an user by ID', async () => {
  //     const user = new User();
  //     user.id = 1;

  //     let result;

  //     jest.spyOn(User, 'delete').mockImplementation(async () => result);

  //     const deleteUserDto = new DeleteItem();
  //     const deleteUser = (await service.delete(
  //       deleteUserDto,
  //     )) as unknown as User;

  //     expect(deleteUser).toBe(result);
  //   });
  // });
});
