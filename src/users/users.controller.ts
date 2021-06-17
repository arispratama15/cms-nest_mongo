import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // create user
  @Post()
  async createOneUser(@Body() createUserDto: CreateUserDto) {
    const generatedId = await this.usersService.createOneUser(createUserDto);
    return { id: generatedId };
  }

  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') userId: string) {
    return this.usersService.getOneUser(userId);
  }

  @Put(':id')
  updateUser(@Param('id') userId: string, @Body('nama') nama: string) {
    this.usersService.updateUser(userId, nama);
    return null;
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    this.usersService.deleteUser(userId);
    return null;
  }
}
