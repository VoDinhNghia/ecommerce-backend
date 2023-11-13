/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { HttpException } from '@nestjs/common';
import { join } from 'path';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import { GetCurrentDate } from 'src/utils/utils.get.current-date';

export const imageFileFilter = (
  req: Record<any, any>,
  file: Record<string, any>,
  callback: any,
) => {
  if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
    return callback(
      new HttpException(
        {
          statusCode: statusCodeRes.BAD_REQUEST,
          message: 'Only *.jpg|webp|png|jpeg file accepted.',
        },
        statusCodeRes.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const destinationAttachment = (
  req: Record<any, any>,
  file: Record<string, any>,
  cb: any,
) => {
  cb(null, join(__dirname, '../../..', './src/public/products'));
};

export const fileName = (
  req: Record<any, any>,
  file: Record<string, any>,
  cb: any,
) => {
  const getCurrentDate = new GetCurrentDate().getYearMonthDate();
  cb(null, `${getCurrentDate}-${file.originalname}`);
};
