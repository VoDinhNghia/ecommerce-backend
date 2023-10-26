import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { slideImageController } from 'src/constants/constants.controller.name';
import { SlideImagesService } from './slide-images.service';

@Controller(slideImageController.name)
@ApiTags(slideImageController.tag)
export class SlideImagesController {
  constructor(private service: SlideImagesService) {}
}
