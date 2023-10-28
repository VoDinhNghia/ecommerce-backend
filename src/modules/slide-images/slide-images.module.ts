import { Module } from '@nestjs/common';
import { SlideImagesController } from './slide-images.controller';
import { SlideImagesService } from './slide-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlideImageAdv } from './entities/slide-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlideImageAdv])],
  controllers: [SlideImagesController],
  providers: [SlideImagesService],
})
export class SlideImagesModule {}
