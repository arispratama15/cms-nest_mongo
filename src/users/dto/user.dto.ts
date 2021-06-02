import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class GetOneItemDto{
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateUserDto{
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  nama: string;
}

export class DeleteItem{
  @IsNotEmpty()
  @IsNumber()
  id: number;
}