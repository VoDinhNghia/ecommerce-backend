import { PartialType } from '@nestjs/swagger';
import { CreateSlideImageDto } from './slide-images.create.dto';

export class UpdateSlideImagesDto extends PartialType(CreateSlideImageDto) {}
