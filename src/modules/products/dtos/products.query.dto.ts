import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { QueryPagination } from 'src/utils/utils.query.pagination.dto';

export class QueryProductDto extends QueryPagination {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  categoryId?: string;
}
