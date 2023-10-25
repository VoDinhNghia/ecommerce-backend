import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  updatedBy?: string;

  @ApiProperty()
  createdBy?: string;

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
  password?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  mobile?: string;

  @ApiProperty()
  gender?: string;
}
