import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlideImageAdv } from './entities/slide-images.entity';
import { Equal, Repository } from 'typeorm';
import { CreateSlideImageDto } from './dtos/slide-images.create.dto';
import { FileRequestDto } from 'src/utils/utils.file-request.dto';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import { slideImageMsg } from 'src/constants/constants.message.response';
import { unlinkSync } from 'fs';

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

  async findAll(): Promise<{ results: SlideImageAdv[]; total: number }> {
    const results = await this.slideImageRepo.find();
    return {
      results,
      total: results?.length,
    };
  }

  async delete(id: string): Promise<void> {
    const result = await this.findById(id);
    await this.slideImageRepo.delete(id);
    unlinkSync(result?.path);
  }
}
