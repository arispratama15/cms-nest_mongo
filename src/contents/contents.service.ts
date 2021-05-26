import { Injectable } from '@nestjs/common';

import { UpdateResult, DeleteResult } from 'typeorm';

import { Content } from './content.entity';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentsService {

    async create(CreateContentDto: CreateContentDto) {
        const content = Content.create(CreateContentDto);
        await content.save();

        return content;
    }
    
    async showById(id: number): Promise<Content> {
        const content = await this.findById(id);
        
        return content;
    }

    async findById(id: number) {
        return await Content.findOne(id);
    }

    async getAllContents(): Promise<Content[]> {
        return await Content.find();
    }

    async delete(id): Promise<DeleteResult> {
        return await Content.delete(id);
    }

    async update(content: Content): Promise<UpdateResult> {
        return await Content.update(content.id, content);
    }

}
