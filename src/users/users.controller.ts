import { Controller, Get, Post, Body, Delete, Put, Param, Res } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, GetOneItemDto, DeleteItem } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // create user
  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // find user by id
  @Get('/profile')
  show(@Body() GetOneItemDto: GetOneItemDto) {
    return this.usersService.findById(GetOneItemDto);
  }

  // put to edit user profile by id
  @Put('/:id')
  async update(@Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.update(UpdateUserDto);
  }

  // delete user by id
  @Delete('/delete')
  async delete(@Body() DeleteItem: DeleteItem) {
    return this.usersService.delete(DeleteItem);
  }

}
