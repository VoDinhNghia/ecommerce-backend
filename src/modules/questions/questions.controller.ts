import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { questionController } from 'src/constants/constants.controller.name';
import { QuestionsService } from './questions.service';

@Controller(questionController.name)
@ApiTags(questionController.tag)
export class QuestionsController {
  constructor(private service: QuestionsService) {}
}
