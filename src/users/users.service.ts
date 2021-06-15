import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  GetOneItemDto,
  DeleteItem,
} from './dto/user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    if (await this.findByUsername(createUserDto.username)) {
      return {
        message: 'User already exists',
      };
    }
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async findByUsername(username: string) {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await User.find();
  }

  async findById(GetOneItemDto: GetOneItemDto) {
    return await User.findOne(GetOneItemDto.id);
  }

  async update(UpdateUserDto: UpdateUserDto) {
    return await User.update(UpdateUserDto.id, UpdateUserDto);
  }

  async delete(DeleteItem: DeleteItem) {
    return await User.delete(DeleteItem);
  }
}
