import { Module } from '@nestjs/common';
import { ServicesUsController } from './services-us.controller';
import { ServicesUsService } from './services-us.service';

@Module({
  controllers: [ServicesUsController],
  providers: [ServicesUsService],
})
export class ServicesUsModule {}
