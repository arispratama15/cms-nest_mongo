import { Controller, Get, Post, Body, Delete, Put, Param, Res } from '@nestjs/common';

import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './content.entity';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  // create content
  @Post()
  async createContent(@Res() res, @Body() CreateContentDto: CreateContentDto) {

    const user = await this.contentsService.create(CreateContentDto);
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
  @Get('/:id')
  show(@Param('id') id: string) {
    return this.contentsService.showById(+id);
  }

  // put to edit user profile by id
  @Put(':id')
  async update(@Param('id') id, @Body() contentData: Content): Promise<any> {
    contentData.id = Number(id);
    console.log('Update #' + contentData.id)
    return this.contentsService.update(contentData);
  }

  // delete user by id
  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return this.contentsService.delete(id);
  }

}