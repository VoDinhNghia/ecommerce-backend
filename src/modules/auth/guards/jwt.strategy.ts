import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Users } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: Record<string, any>) {
    return {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
      status: payload.status,
      statusLogin: payload.statusLogin,
      profileId: payload.profileId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
    };
  }

  verifyToken(token: string) {
    try {
      const payload: Users = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      return payload;
    } catch (error) {
      console.log('verify token socket error');
    }
  }
}
