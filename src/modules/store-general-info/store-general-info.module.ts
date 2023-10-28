import { Module } from '@nestjs/common';
import { StoreGeneralInfoController } from './store-general-info.controller';
import { StoreGeneralInfoService } from './store-general-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreGeneralInfo } from './entities/store-general-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreGeneralInfo])],
  controllers: [StoreGeneralInfoController],
  providers: [StoreGeneralInfoService],
})
export class StoreGeneralInfoModule {}
