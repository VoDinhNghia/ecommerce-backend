import { PartialType } from '@nestjs/swagger';
import { CreateContactDto } from './contacts.create.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
