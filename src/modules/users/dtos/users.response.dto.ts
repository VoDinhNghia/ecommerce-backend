import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  middleName?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  mobile?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  address?: string;
}
