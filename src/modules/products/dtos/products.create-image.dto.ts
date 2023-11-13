import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { StorageObjectDto } from 'src/utils/utils.file-upload.dto';

export class CreateProductImageDto extends StorageObjectDto {
  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({ default: false })
  isAvatar?: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productId?: string;
}
