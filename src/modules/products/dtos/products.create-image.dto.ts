import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDto {
  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({ default: false })
  isAvatar?: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId?: string;
}
