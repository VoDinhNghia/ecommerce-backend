import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesUs } from './entities/services-us.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesUsService {
  constructor(
    @InjectRepository(ServicesUs)
    private serviceUsRepo: Repository<ServicesUs>,
  ) {}
}
