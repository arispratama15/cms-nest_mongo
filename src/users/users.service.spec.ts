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
      this.deleteOne = () => {
        return;
      };
      this.findByIdAndRemove = () => {
        return this.user;
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
  describe('User find by ID', () => {
    it('should find an user by ID', async () => {
      const user = new userModel();
      user.id = '1';
      const userId = '1';
      jest.spyOn(service, 'findUser').mockImplementation(async () => user);
      const findUser = (await service.getOneUser(userId)) as unknown as User;
      expect(findUser.id).toBe('1');
    });
  });
  describe('Update an user', () => {
    it('should update an user by ID', async () => {
      const user = new userModel();
      user.id = '1';
      user.nama = 'asuw';

      jest.spyOn(service, 'findUser').mockImplementation(async () => user);
      // jest.spyOn(userModel, 'findById').

      const userUpdate = (await service.updateUser(
        user.id,
        user.nama,
      )) as unknown as User;

      expect(userUpdate).toBe('1');
    });
  });
  describe('Delete an user', () => {
    it('should delete an user by ID', async () => {
      const user = new userModel();
      user.id = '1';

      let result;
      // jest
      //   .spyOn(userModel, 'findByIdAndRemove')
      //   .mockReturnValueOnce(result as any);
      userModel.findByIdAndRemove(user.id);
      const deleteUser = (await service.deleteUser(user.id)) as unknown as User;

      expect(deleteUser).toBe(result);
    });
  });
});
