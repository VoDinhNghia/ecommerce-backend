import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { slideImageController } from 'src/constants/constants.controller.name';
import { SlideImagesService } from './slide-images.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role-auth.guard';
import { ErolesUser } from 'src/constants/constant';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  destinationSlideImg,
  fileName,
  imageFileFilter,
} from 'src/validates/validates.attachment.upload-file';
import { diskStorage } from 'multer';
import { ResponseRequest } from 'src/utils/utils.response-api';
import { slideImageMsg } from 'src/constants/constants.message.response';
import { Response } from 'express';
import { CreateSlideImageDto } from './dtos/slide-images.create.dto';

@Controller(slideImageController.name)
@ApiTags(slideImageController.tag)
export class SlideImagesController {
  constructor(private service: SlideImagesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: destinationSlideImg,
        filename: fileName,
      }),
    }),
  )
  async createImage(
    @Res() res: Response,
    @Body() body: CreateSlideImageDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<ResponseRequest> {
    const result = await this.service.create(body, file);
    return new ResponseRequest(res, result, slideImageMsg.create);
  }

  @Get()
  async findAllSlide(@Res() res: Response): Promise<ResponseRequest> {
    const result = await this.service.findAll();
    return new ResponseRequest(res, result, slideImageMsg.getList);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard([ErolesUser.SUPPER_ADMIN]))
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseRequest> {
    await this.service.delete(id);
    return new ResponseRequest(res, 'OK', slideImageMsg.delete);
  }
}
