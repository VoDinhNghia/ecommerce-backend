import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { tutorialController } from 'src/constants/constants.controller.name';
import { TutorialsService } from './tutorials.service';

@Controller(tutorialController.name)
@ApiTags(tutorialController.tag)
export class TutorialsController {
  constructor(private service: TutorialsService) {}
}
