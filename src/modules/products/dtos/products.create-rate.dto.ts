import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateProductRateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId?: string;

  @IsNumber()
  @Type(() => Number)
  @Max(5)
  @Min(0)
  @ApiProperty()
  rate?: number;
}
