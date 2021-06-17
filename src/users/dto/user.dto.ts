import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isAdmin: boolean;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  nama: string;
}
