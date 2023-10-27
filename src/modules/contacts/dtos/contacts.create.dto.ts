import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;
}
