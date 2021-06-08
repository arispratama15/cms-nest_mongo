import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, GetOneItemDto, DeleteItem } from './dto/user.dto';
import { Repository } from 'typeorm';

jest.mock('./user.entity')

const mockUser = {
  nama: 'test',
  username: 'test',
  password: 'test',
  isAdmin: true
};

const mockUserEntity = {
  id: 1,
  nama: '',
  username: '',
  password: '',
  registered: new Date(),
  isAdmin: true
}


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, User],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('Create User', () => {
    it('should create a new user then return it', async () => {
      let user = new User();

      jest.spyOn(User, 'create').mockImplementation(() => user);
      jest.spyOn(User, 'save').mockImplementation(async () => user);
      jest.spyOn(service, 'findByUsername').mockImplementation(null);

      expect(await service.create(new CreateUserDto())).toBe(user);

      const createUserDto = new CreateUserDto();
      const userCreate = (await service.create(createUserDto)) as unknown as User;

      expect(userCreate).toBe(user);
    });
    it('should return an error user already exist', async () => {
      let user = new User();

      jest.spyOn(service, 'findByUsername').mockImplementation(async () => user);

      const createUserDto = new CreateUserDto();
      const userCreate = (await service.create(createUserDto)) as unknown as { message: string };

      expect(userCreate.message).toBe("User already exists");
    });
  });
  describe('Get all users', () => {
    it('should find all users', async () => {
      const result: User[] = [];
      jest.spyOn(service, "getAllUsers").mockResolvedValueOnce(result);

      expect(await service.getAllUsers()).toBe(result);
    });
  });
  describe('User find by ID', () => {
    it('should find an user by ID', async () => {
      let user = new User();
      user.id = 1;

      jest.spyOn(User, 'findOne').mockImplementation(async () => user);

      const getOneItemDto = new GetOneItemDto();
      const findUser = (await service.findById(getOneItemDto)) as unknown as User;

      expect(findUser.id).toBe(user.id);
    });
  });
  describe('Update an user', () => {
    it('should update an user by ID', async () => {
      let user = new User();
      user.id = 1;
      user.nama = '';

      let result;

      jest.spyOn(User, 'update').mockImplementation(async () => result);

      const updateUserDto = new UpdateUserDto();
      const updateUser = (await service.update(updateUserDto)) as unknown as User;

      expect(updateUser).toBe(result);
    });
  });
  describe('Delete an user', () => {
    it('should delete an user by ID', async () => {
      let user = new User();
      user.id = 1;

      let result;

      jest.spyOn(User, 'delete').mockImplementation(async () => result);

      const deleteUserDto = new DeleteItem();
      const deleteUser = (await service.delete(deleteUserDto)) as unknown as User;

      expect(deleteUser).toBe(result);
    });
  });
});
