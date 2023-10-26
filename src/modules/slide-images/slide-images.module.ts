import { Module } from '@nestjs/common';
import { SlideImagesController } from './slide-images.controller';
import { SlideImagesService } from './slide-images.service';

@Module({
  controllers: [SlideImagesController],
  providers: [SlideImagesService],
})
export class SlideImagesModule {}
