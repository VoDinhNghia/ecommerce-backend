import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDiscountDto {
  @IsNumber()
  @Type(() => Number)
  @Max(100)
  @Min(0)
  @ApiProperty()
  discount?: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty()
  endDate?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId?: string;
}
