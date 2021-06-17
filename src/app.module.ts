import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      //Replace this line with the one Cluster > Connect > Connect your Application
      `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    ),
    UsersModule,
    AuthModule,
    ContentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
