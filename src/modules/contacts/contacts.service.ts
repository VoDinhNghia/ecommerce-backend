import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contacts.entity';
import { Equal, Repository } from 'typeorm';
import { CreateContactDto } from './dtos/contacts.create.dto';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import { contactMsg } from 'src/constants/constants.message.response';
import { UpdateContactDto } from './dtos/contacts.update.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  async create(contactDto: CreateContactDto): Promise<Contact> {
    const result = await this.contactRepo.save(contactDto);
    return result;
  }

  async findById(id: string): Promise<Contact> {
    const result = await this.contactRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, contactMsg.notFound);
    }
    return result;
  }

  async update(id: string, updateDto: UpdateContactDto): Promise<void> {
    await this.findById(id);
    await this.contactRepo.update(id, { ...updateDto, updatedAt: new Date() });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.contactRepo.delete(id);
  }

  async findAll(): Promise<Contact[]> {
    const results = await this.contactRepo.find();
    return results;
  }
}
