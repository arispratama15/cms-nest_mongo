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
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
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
      const userDto = new CreateUserDto();
      const { nama, username, password, isAdmin } = userDto;
      // const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(async () => hashedPassword);
      const newUser = new userModel({
        nama,
        username,
        password: hashedPassword,
        isAdmin,
      });
      // const newUser = new userModel();

      jest.spyOn(newUser, 'save').mockImplementation(async () => newUser);

      const userCreate = (await service.createOneUser(
        userDto,
      )) as unknown as User;

      expect(userCreate).toBe(newUser);
    });
    //   it('should return an error user already exist', async () => {
    //     const user = new User();

    //     jest
    //       .spyOn(service, 'findByUsername')
    //       .mockImplementation(async () => user);

    //     const createUserDto = new CreateUserDto();
    //     const userCreate = (await service.create(createUserDto)) as unknown as {
    //       message: string;
    //     };

    //     expect(userCreate.message).toBe('User already exists');
    //   });
  });
  // describe('Get all users', () => {
  //   it('should find all users', async () => {
  //     const result: User[] = [];
  //     jest.spyOn(service, 'getAllUsers').mockResolvedValueOnce(result);

  //     expect(await service.getAllUsers()).toBe(result);
  //   });
  // });
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
