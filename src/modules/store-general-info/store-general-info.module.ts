import { Module } from '@nestjs/common';
import { StoreGeneralInfoController } from './store-general-info.controller';
import { StoreGeneralInfoService } from './store-general-info.service';

@Module({
  controllers: [StoreGeneralInfoController],
  providers: [StoreGeneralInfoService],
})
export class StoreGeneralInfoModule {}
