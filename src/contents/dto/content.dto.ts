import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  author: string;
}

export class GetOneItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateContentDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}

export class DeleteItem {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
