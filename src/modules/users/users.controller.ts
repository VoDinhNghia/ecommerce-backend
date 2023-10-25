import { Controller, Logger, Res, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { UsersService } from './users.service';
import { Response } from 'express';
import { userController } from 'src/constants/constants.controller.name';
import { userMsg } from 'src/constants/constants.message.response';
import { CreateUserDto } from './dtos/users.create.dto';

@Controller(userController.name)
@ApiTags(userController.tag)
export class UsersController {
  private readonly logger = new Logger(UsersService.name);
  constructor(private service: UsersService) {
    const userDto: CreateUserDto = {
      email: 'vodinhnghia85@gmail.com',
      password: 'admin123@',
      mobile: '0365572875',
      middleName: '',
      firstName: 'Admin',
      lastName: 'Super',
      address: 'Binh Hiep - Binh Son - Quang Ngai',
    };
    (async () => {
      await this.service.initSuperAdmin(userDto);
    })();
  }

  @Post()
  async migrateUsersData(@Res() res: Response): Promise<ResponseRequest> {
    this.logger.log('api create user');
    return new ResponseRequest(res, true, userMsg.create);
  }
}
