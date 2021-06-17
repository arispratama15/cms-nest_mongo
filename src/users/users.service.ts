import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './users.model';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createOneUser(createUserDto: CreateUserDto) {
    const { nama, username, password, isAdmin } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      nama,
      username,
      password: hashedPassword,
      isAdmin,
    });

    try {
      const result = await newUser.save();
      return result.id;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  /**
   * Get All Users
   */
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      nama: user.nama,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
    }));
  }

  /**
   * Get One User
   * @param userId
   */
  async getOneUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      nama: user.nama,
      username: user.username,
    };
  }

  async updateUser(userId: string, nama: string) {
    const modUser = await this.findUser(userId);

    //Only modify Values passed
    if (nama) modUser.nama = nama;

    modUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<User> {
    let user: any;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
