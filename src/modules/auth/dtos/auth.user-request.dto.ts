import { ApiProperty } from '@nestjs/swagger';

export class UserRequestHeaderDto {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  middleName?: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  mobile?: string;
}
