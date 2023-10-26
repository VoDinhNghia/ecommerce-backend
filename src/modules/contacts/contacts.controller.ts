import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { contactController } from 'src/constants/constants.controller.name';
import { ContactsService } from './contacts.service';

@Controller(contactController.name)
@ApiTags(contactController.tag)
export class ContactsController {
  constructor(private service: ContactsService) {}
}
