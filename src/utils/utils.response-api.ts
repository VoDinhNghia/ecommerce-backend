import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
export class ResponseRequest {
  constructor(res: Response, data: string | boolean | any, message: string) {
    res.status(HttpStatus.OK).json({
      statusCode: statusCodeRes.OK,
      data,
      message,
    });
  }
}
