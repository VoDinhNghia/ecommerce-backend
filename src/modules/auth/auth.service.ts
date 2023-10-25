import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { cryptoPassWord } from 'src/constants/constants.crypto';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dtos/auth.login.dto';
import { UserResponseDto } from '../users/dtos/users.response.dto';
import { authMsg } from 'src/constants/constants.message.response';
import { statusCodeRes } from 'src/constants/constants.http-status-code';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async login(loginDto: LoginDto): Promise<UserResponseDto> {
    const user: UserResponseDto = await this.findUserAuth(loginDto);
    if (!user) {
      new CommonException(statusCodeRes.UN_AUTHORIZED, authMsg.unAuthorized);
    }
    const result: UserResponseDto & { accessToken: string } = {
      ...user,
      accessToken: this.jwtService.sign({ ...user }),
    };
    return result;
  }

  async findUserAuth(loginDto: LoginDto): Promise<UserResponseDto | null> {
    const { password, email } = loginDto;
    const passwordEncryt = cryptoPassWord(password);
    const result = await this.usersRepository.findOneBy({
      email,
      password: passwordEncryt,
    });
    return result ?? null;
  }
}
