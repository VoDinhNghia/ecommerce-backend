import { HttpStatus } from '@nestjs/common';
import { statusCodeRes } from 'src/constants/constants.http-status-code';

export class ResponseRequest {
  constructor(res: any, data: any, message: string) {
    res.status(HttpStatus.OK).json({
      statusCode: statusCodeRes.OK,
      data,
      message,
    });
  }
}
