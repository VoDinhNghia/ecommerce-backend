import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlideImageAdv } from './entities/slide-images.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlideImagesService {
  constructor(
    @InjectRepository(SlideImageAdv)
    private slideImageRepo: Repository<SlideImageAdv>,
  ) {}
}
