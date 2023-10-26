import {
  Controller,
  Logger,
  Res,
  Post,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { UsersService } from './users.service';
import { Response } from 'express';
import { userController } from 'src/constants/constants.controller.name';
import { userMsg } from 'src/constants/constants.message.response';
import { CreateUserDto } from './dtos/users.create.dto';
import { ErolesUser, initAdminInfo } from 'src/constants/constant';
import { logMsg } from 'src/constants/constants.log-message';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { UserQueryDto } from './dtos/users.query.dto';

@Controller(userController.name)
@ApiTags(userController.tag)
export class UsersController {
  private readonly logger = new Logger(UsersService.name);
  constructor(private service: UsersService) {
    const userDto: CreateUserDto = initAdminInfo;
    (async () => {
      await this.service.initSuperAdmin(userDto);
    })();
  }

  @Post()
  async registerAccount(@Res() res: Response): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiCreateUser);
    return new ResponseRequest(res, true, userMsg.create);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async getListUsers(
    @Query() queryDto: UserQueryDto,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiFetchUsers);
    const results = await this.service.findAllUsers(queryDto);
    return new ResponseRequest(res, results, userMsg.listUsers);
  }
}
