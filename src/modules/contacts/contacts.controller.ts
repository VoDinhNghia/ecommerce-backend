import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { contactController } from 'src/constants/constants.controller.name';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { ErolesUser } from 'src/constants/constant';
import { CreateContactDto } from './dtos/contacts.create.dto';
import { Response } from 'express';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { contactMsg } from 'src/constants/constants.message.response';
import { UpdateContactDto } from './dtos/contacts.update.dto';

@Controller(contactController.name)
@ApiTags(contactController.tag)
export class ContactsController {
  constructor(private service: ContactsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async create(
    @Body() createDto: CreateContactDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.create(createDto);
    return new ResponseRequest(res, result, contactMsg.create);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContactDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.update(id, updateDto);
    return new ResponseRequest(res, true, contactMsg.update);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.delete(id);
    return new ResponseRequest(res, true, contactMsg.delete);
  }

  @Get()
  async fetchList(@Res() res: Response): Promise<ResponseRequest> {
    const results = await this.service.findAll();
    return new ResponseRequest(res, results, contactMsg.getList);
  }

  @Get('/:id')
  async fetchById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    const result = await this.service.findById(id);
    return new ResponseRequest(res, result, contactMsg.getDetail);
  }
}
