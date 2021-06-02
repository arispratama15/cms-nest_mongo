import { Controller, Get, Post, Body, Delete, Put, Param, Res } from '@nestjs/common';

import { ContentsService } from './contents.service';
import { CreateContentDto, GetOneItemDto, UpdateContentDto, DeleteItem } from './dto/content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  // create content
  @Post()
  async createContent(@Res() res, @Body() CreateContentDto: CreateContentDto) {
    await this.contentsService.create(CreateContentDto);
    return res.json({
      message: "Content has been created successfully"
    })
  }

  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.contentsService.getAllContents();
  }

  // find user by id
  @Get('/list')
  show(@Body() GetOneItemDto: GetOneItemDto) {
    return this.contentsService.findById(GetOneItemDto);
  }

  // put to edit user profile by id
  @Put(':id')
  async update(@Body() UpdateContentDto: UpdateContentDto) {
    return this.contentsService.update(UpdateContentDto);
  }

  // delete user by id
  @Delete('/delete')
  async delete(@Body() DeleteItem: DeleteItem) {
    return this.contentsService.delete(DeleteItem);
  }

}