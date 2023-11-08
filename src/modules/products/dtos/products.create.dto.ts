import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @Max(1000000000)
  @Min(0)
  @ApiProperty()
  price?: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  @Max(10000000)
  @Min(0)
  @ApiProperty()
  quantity?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryId?: string;
}
