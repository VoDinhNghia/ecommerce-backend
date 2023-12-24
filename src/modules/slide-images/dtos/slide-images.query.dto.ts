import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { QueryPagination } from 'src/utils/utils.query.pagination.dto';

export class QuerySlideImageDto extends QueryPagination {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  @ApiPropertyOptional()
  isActive?: boolean;
}
