import { Test, TestingModule } from '@nestjs/testing';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';


jest.mock('../users/user.entity')

describe('UsersService', () => {
    let userService: UsersService;
    let authService: AuthService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UsersService, JwtService, User, AuthModule],
        }).compile();

        userService = module.get<UsersService>(UsersService);
        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService)
    });

    describe('User login', () => {
        it('should validate the User then return token', async () =>{

        });
    });
});