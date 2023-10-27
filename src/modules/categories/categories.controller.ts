import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { categoryController } from 'src/constants/constants.controller.name';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { ErolesUser } from 'src/constants/constant';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { CreateCategoryDto } from './dtos/categories.create.dto';
import { Response } from 'express';
import { logMsg } from 'src/constants/constants.log-message';
import { categoryMsg } from 'src/constants/constants.message.response';
import { UpdateCategoryDto } from './dtos/categories.update.dto';
import { QueryCategoryDto } from './dtos/categories.query.dto';

@Controller(categoryController.name)
@ApiTags(categoryController.tag)
export class CategoriesController {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(private service: CategoriesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async create(
    @Body() createDto: CreateCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiCreateCategory);
    const result = await this.service.create(createDto);
    return new ResponseRequest(res, result, categoryMsg.create);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiUpdateCategory);
    await this.service.update(id, updateDto);
    return new ResponseRequest(res, true, categoryMsg.update);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiDeleteCategory);
    await this.service.delete(id);
    return new ResponseRequest(res, true, categoryMsg.delete);
  }

  @Get()
  async fetchAll(
    @Query() queryDto: QueryCategoryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiFectchCategories);
    const results = await this.service.findAll(queryDto);
    return new ResponseRequest(res, results, categoryMsg.gelist);
  }
}
