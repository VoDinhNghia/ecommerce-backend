import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { storeGeneralInfoController } from 'src/constants/constants.controller.name';
import { StoreGeneralInfoService } from './store-general-info.service';

@Controller(storeGeneralInfoController.name)
@ApiTags(storeGeneralInfoController.tag)
export class StoreGeneralInfoController {
  constructor(private service: StoreGeneralInfoService) {}
}
