import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreGeneralInfo } from './entities/store-general-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreGeneralInfoService {
  constructor(
    @InjectRepository(StoreGeneralInfo)
    private storeRepo: Repository<StoreGeneralInfo>,
  ) {}
}
