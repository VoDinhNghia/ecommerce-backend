import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutorials } from './entities/tutorials.entity';
import { Repository } from 'typeorm';
import { TutorialImages } from './entities/tutorials.image.entity';

@Injectable()
export class TutorialsService {
  constructor(
    @InjectRepository(Tutorials)
    private tutorialRepo: Repository<Tutorials>,
    @InjectRepository(TutorialImages)
    private imageRepo: Repository<TutorialImages>,
  ) {}
}
