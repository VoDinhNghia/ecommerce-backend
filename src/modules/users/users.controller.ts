import { Controller, Logger, Res, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { UsersService } from './users.service';
import { Response } from 'express';
import { userController } from 'src/constants/constants.controller.name';
import { userMsg } from 'src/constants/constants.message.response';
import { CreateUserDto } from './dtos/users.create.dto';
import { initAdminInfo } from 'src/constants/constant';
import { logMsg } from 'src/constants/constants.log-message';

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
  async migrateUsersData(@Res() res: Response): Promise<ResponseRequest> {
    this.logger.log(logMsg.apiCreateUser);
    return new ResponseRequest(res, true, userMsg.create);
  }
}
