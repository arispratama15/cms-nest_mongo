import { Injectable } from '@nestjs/common';

import { UpdateResult, DeleteResult } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    async create(createUserDto: CreateUserDto) {
        const user = User.create(createUserDto);
        await user.save();

        delete user.password;
        return user;
    }
    
    async showById(id: number): Promise<User> {
        const user = await this.findById(id);

        delete user.password;
        return user;
    }

    async findById(id: number) {
        return await User.findOne(id);
    }

    async findByUsername(username: string) {
        return await User.findOne({
            where: {
                username: username,
            },
        });
    }

    async getAllUsers(): Promise<User[]> {
        return await User.find();
    }

    async delete(id): Promise<DeleteResult> {
        return await User.delete(id);
    }

    async update(user: User): Promise<UpdateResult> {
        return await User.update(user.id, user);
    }

}

