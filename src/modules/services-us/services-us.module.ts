import { Module } from '@nestjs/common';
import { ServicesUsController } from './services-us.controller';
import { ServicesUsService } from './services-us.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesUs } from './entities/services-us.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesUs])],
  controllers: [ServicesUsController],
  providers: [ServicesUsService],
})
export class ServicesUsModule {}
