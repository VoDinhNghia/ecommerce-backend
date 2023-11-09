import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDetailDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty()
  dateOfManufacture?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  color?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  inputPower?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  mainboard?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  memory?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  size?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  warrantyExpiration?: string;
}
