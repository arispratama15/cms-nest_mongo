import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './contents.model';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }]),
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
