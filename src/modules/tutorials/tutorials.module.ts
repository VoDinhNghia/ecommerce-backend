import { Module } from '@nestjs/common';
import { TutorialsController } from './tutorials.controller';
import { TutorialsService } from './tutorials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutorials } from './entities/tutorials.entity';
import { TutorialImages } from './entities/tutorials.image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutorials, TutorialImages])],
  controllers: [TutorialsController],
  providers: [TutorialsService],
})
export class TutorialsModule {}
