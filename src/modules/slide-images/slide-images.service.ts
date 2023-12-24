import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlideImageAdv } from './entities/slide-images.entity';
import { Equal, Like, Repository } from 'typeorm';
import { CreateSlideImageDto } from './dtos/slide-images.create.dto';
import { FileRequestDto } from 'src/utils/utils.file-request.dto';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import { slideImageMsg } from 'src/constants/constants.message.response';
import { unlinkSync } from 'fs';
import { UpdateSlideImagesDto } from './dtos/slide-images.update.dto';
import { QuerySlideImageDto } from './dtos/slide-images.query.dto';
import { IquerySlideImage } from './interfaces/slide-images.interface';

@Injectable()
export class SlideImagesService {
  constructor(
    @InjectRepository(SlideImageAdv)
    private slideImageRepo: Repository<SlideImageAdv>,
  ) {}

  async create(
    slideDto: CreateSlideImageDto,
    fileDto: FileRequestDto,
  ): Promise<SlideImageAdv> {
    const dto = {
      ...slideDto,
      url: fileDto?.filename,
      originName: fileDto?.originalname,
      path: fileDto?.path,
    };
    const result = await this.slideImageRepo.save(dto);
    return result;
  }

  async findById(id: string): Promise<SlideImageAdv> {
    const result = await this.slideImageRepo.findOneBy({ id: Equal(id) });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, slideImageMsg.notfound);
    }
    return result;
  }

  async findAll(
    queyDto: QuerySlideImageDto,
  ): Promise<{ results: SlideImageAdv[]; total: number }> {
    const { isActive, limit, page, searchKey } = queyDto;
    const total = await this.slideImageRepo.count();
    const query: IquerySlideImage = {};
    if (searchKey) {
      query.originName = Like(`%${searchKey}%`);
    }
    if (isActive) {
      query.isActive = isActive;
    }
    const results = await this.slideImageRepo.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : 0,
      take: limit ? Number(limit) : total,
    });
    return {
      results,
      total,
    };
  }

  async update(id: string, slideDto: UpdateSlideImagesDto): Promise<void> {
    await this.findById(id);
    await this.slideImageRepo.update(id, {
      ...slideDto,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.findById(id);
    await this.slideImageRepo.delete(id);
    unlinkSync(result?.path);
  }
}
