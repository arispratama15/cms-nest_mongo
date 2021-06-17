import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Content } from './contents.model';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<Content>,
  ) {}

  async createOneContent(author: string, content: string) {
    const newContent = new this.contentModel({
      author,
      content,
    });

    const result = await newContent.save();
    return result.id;
  }

  /**
   * Get All Users
   */
  async getAllContents() {
    const contents = await this.contentModel.find().exec();
    return contents.map((content) => ({
      id: content.id,
      author: content.author,
      konten: content.konten,
    }));
  }

  /**
   * Get One User
   * @param userId
   */
  async getOneContent(contentId: string) {
    const content = await this.findContent(contentId);
    return {
      id: content.id,
      author: content.author,
      konten: content.konten,
    };
  }

  async updateContent(userId: string, author: string, konten: string) {
    const modContent = await this.findContent(userId);

    //Only modify Values passed
    if (author) modContent.author = author;
    if (konten) modContent.konten = konten;

    modContent.save();
  }

  async deleteContent(contentId: string) {
    const result = await this.contentModel.deleteOne({ _id: contentId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find content.');
    }
  }

  private async findContent(id: string): Promise<Content> {
    let content: any;
    try {
      content = await this.contentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find content.');
    }
    if (!content) {
      throw new NotFoundException('Could not find content.');
    }
    return content;
  }
}
