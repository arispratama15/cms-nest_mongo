import { Injectable } from '@nestjs/common';
import { Content } from './content.entity';
import {
  CreateContentDto,
  GetOneItemDto,
  UpdateContentDto,
  DeleteItem,
} from './dto/content.dto';

@Injectable()
export class ContentsService {
  async create(CreateContentDto: CreateContentDto) {
    const content = Content.create(CreateContentDto);
    await content.save();

    return content;
  }

  async getAllContents(): Promise<Content[]> {
    return await Content.find();
  }

  async findById(GetOneItemDto: GetOneItemDto) {
    return await Content.findOne(GetOneItemDto.id);
  }

  async update(UpdateContentDto: UpdateContentDto) {
    return await Content.update(UpdateContentDto.id, UpdateContentDto);
  }

  async delete(DeleteItem: DeleteItem) {
    return await Content.delete(DeleteItem);
  }
}
