import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductReview {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId?: string;
}
