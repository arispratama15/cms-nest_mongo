import { Test, TestingModule } from '@nestjs/testing';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

jest.mock('@nestjs/jwt');
jest.mock('../users/user.entity')

const mockUserEntity = {
    id: 1,
    nama: '',
    username: '',
    password: '',
    registered: new Date(),
    isAdmin: true
}

describe('UsersService', () => {
    let userService: UsersService;
    let authService: AuthService;
    let jwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UsersService, JwtService, User],
        }).compile();

        userService = module.get<UsersService>(UsersService);
        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService)
    });

    describe('User login', () => {
        it('should validate the User then return token', async () => {
            let user = new User();
            user.id = 1;
            user.nama = '';
            user.username = '';
            user.password = '';
            user.registered = new Date();
            user.isAdmin = true;

            let payload = {
                userId: user.id,
            };

            jest.spyOn(authService, 'validateUser').mockImplementation(() => Promise.resolve(user));
            jest.spyOn(userService, 'findByUsername').mockImplementation(async () => user);
            jest.spyOn(jwtService, 'sign').mockImplementation(async () => payload);

            const userLoginDto = new AuthLoginDto();
            const userLogin = (await authService.login(userLoginDto)) as unknown as {
                access_token: string,
                user: [{
                    id: number,
                    user: string,
                    isAdmin: boolean
                }]
            }

            expect(userLogin.user[0].id).toBe(1)

        });
        it('should return reject, because user not found', async () => {

            jest.spyOn(authService, 'validateUser').mockImplementation(() => Promise.resolve(null));
            jest.spyOn(userService, 'findByUsername').mockImplementation(async () => null);
            jest.spyOn(jwtService, 'sign').mockImplementation(async () => null);

            const userLoginDto = new AuthLoginDto();

            expect(authService.login(userLoginDto)).rejects.toThrow()

        });
    });

});