import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  IhandleRequestJwtError,
  IhandleRequestJwtUser,
} from '../interfaces/auth.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: IhandleRequestJwtError, user: IhandleRequestJwtUser) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
