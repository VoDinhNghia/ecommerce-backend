import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { servicesUsController } from 'src/constants/constants.controller.name';
import { ServicesUsService } from './services-us.service';

@Controller(servicesUsController.name)
@ApiTags(servicesUsController.tag)
export class ServicesUsController {
  constructor(private serviceUs: ServicesUsService) {}
}
