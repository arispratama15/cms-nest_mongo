import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';

import { ContentsService } from './contents.service';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  // create user
  @Post()
  async createOneUser(
    @Body('author') author: string,
    @Body('konten') konten: string,
  ) {
    const generatedId = await this.contentsService.createOneContent(
      author,
      konten,
    );
    return { id: generatedId };
  }

  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.contentsService.getAllContents();
  }

  @Get(':id')
  getOneUser(@Param('id') contentId: string) {
    return this.contentsService.getOneContent(contentId);
  }

  @Put(':id')
  updateUser(
    @Param('id') contentId: string,
    @Body('author') author: string,
    @Body('konten') konten: string,
  ) {
    this.contentsService.updateContent(contentId, author, konten);
    return null;
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    this.contentsService.deleteContent(userId);
    return null;
  }
}
