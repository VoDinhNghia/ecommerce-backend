import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Equal, Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/categories.create.dto';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import { categoryMsg } from 'src/constants/constants.message.response';
import { UpdateCategoryDto } from './dtos/categories.update.dto';
import { QueryCategoryDto } from './dtos/categories.query.dto';
import { IqueryCategory } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepo: Repository<Categories>,
  ) {}

  async create(categoryDto: CreateCategoryDto): Promise<Categories> {
    const { name } = categoryDto;
    const validateName = await this.categoryRepo.findOneBy({
      name,
    });
    if (validateName) {
      new CommonException(statusCodeRes.CONFLICT, categoryMsg.conflictName);
    }
    const result = await this.categoryRepo.save(categoryDto);
    return result;
  }

  async findById(id: string): Promise<Categories> {
    const result = await this.categoryRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, categoryMsg.notFound);
    }
    return result;
  }

  async update(id: string, updateDto: UpdateCategoryDto): Promise<void> {
    await this.findById(id);
    await this.categoryRepo.update(id, {
      ...updateDto,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.findById(id);
    await this.categoryRepo.softRemove(result);
  }

  async findAll(
    queryDto: QueryCategoryDto,
  ): Promise<{ results: Categories[]; total: number }> {
    const { limit, page, searchKey } = queryDto;
    const total = await this.categoryRepo.count();
    const query: IqueryCategory = {};
    if (searchKey) {
      query.name = Like(`%${searchKey}%`);
    }
    const results = await this.categoryRepo.find({
      where: query,
      skip: limit && page ? (Number(page) - 1) * Number(limit) : null,
      take: limit ? Number(limit) : total,
    });
    return {
      results,
      total,
    };
  }
}
