import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './users.create.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersUpdateDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @ApiProperty()
  newPassword?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  gender?: string;
}
