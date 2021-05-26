import { Controller, Get, Post, Body, Delete, Put, Param, Res } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // create user
  @Post()
  async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    if (await this.usersService.findByUsername(createUserDto.username)) {
      return res.json({
        message: "User already exists"
      })
    }
    const user = await this.usersService.create(createUserDto);
    return res.json({
      message: "User has been created successfully"
    })
  }

  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // find user by id
  @Get('/:id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  // put to edit user profile by id
  @Put('/:id')
  async update(@Param('id') id, @Body() userData: User): Promise<any> {
    userData.id = Number(id);
    console.log('Update #' + userData.id)
    return this.usersService.update(userData);
  }

  // delete user by id
  @Delete('/:id')
  async delete(@Param('id') id): Promise<any> {
    return this.usersService.delete(id);
  }

}
