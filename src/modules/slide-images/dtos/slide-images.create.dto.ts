import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { StorageObjectDto } from 'src/utils/utils.file-upload.dto';

export class CreateSlideImageDto extends StorageObjectDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiProperty({ default: false })
  isActive?: boolean;
}
