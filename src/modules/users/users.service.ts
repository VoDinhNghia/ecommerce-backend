import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Not, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dtos/users.create.dto';
import { UserResponseDto } from './dtos/users.response.dto';
import { CommonException } from 'src/exceptions/exeception.common-error';
import { statusCodeRes } from 'src/constants/constants.http-status-code';
import { userMsg } from 'src/constants/constants.message.response';
import { GenerateCode } from 'src/utils/utils.generate.code';
import { UsersUpdateDto } from './dtos/users.update.dto';
import { UserQueryDto } from './dtos/users.query.dto';
import { IqueryBySearchKey, IqueryUser } from './interfaces/users.interface';
import { ErolesUser } from 'src/constants/constant';
import { cryptoPassWord } from 'src/constants/constants.crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async initSuperAdmin(userDto: CreateUserDto): Promise<void> {
    const code = 'SA_2023_ecommerce';
    const existedAdmin = await this.usersRepository.findOneBy({
      code,
      role: ErolesUser.SUPPER_ADMIN,
    });
    if (!existedAdmin) {
      await this.usersRepository.save({ ...userDto, code });
    }
  }

  async registerAccount(userDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password } = userDto;
    const existedEmail = await this.usersRepository.findOneBy({
      email,
    });
    if (existedEmail) {
      new CommonException(statusCodeRes.CONFLICT, userMsg.existedEmail);
    }
    const result = await this.usersRepository.save({
      ...userDto,
      code: new GenerateCode().getCodeUser(7),
      password: cryptoPassWord(password),
    });
    return result;
  }

  async findById(id: string): Promise<UserResponseDto> {
    const result = await this.usersRepository.findOneBy({
      id: Equal(id),
    });
    if (!result) {
      new CommonException(statusCodeRes.NOT_FOUND, userMsg.notFound);
    }
    return result;
  }

  async updateUser(id: string, updateDto: UsersUpdateDto): Promise<void> {
    const { password = '', newPassword } = updateDto;
    if (password && newPassword) {
      const validatePass = await this.usersRepository.findOneBy({
        id: Equal(id),
        password: cryptoPassWord(password),
      });
      if (!validatePass) {
        new CommonException(statusCodeRes.FORBIDDEN, userMsg.passwordInvalid);
      }
      updateDto.password = cryptoPassWord(newPassword);
    }
    const userUpdateDto = {
      ...updateDto,
      updatedAt: new Date(),
    };
    await this.usersRepository.update(id, userUpdateDto);
  }

  async findAllUsers(
    queryDto: UserQueryDto,
  ): Promise<{ results: UserResponseDto[]; total: number }> {
    const { searchKey, limit, page } = queryDto;
    let query: IqueryUser | IqueryBySearchKey = {
      role: Not(ErolesUser.SUPPER_ADMIN),
    };
    const total = await this.usersRepository.count({ where: query });
    if (searchKey) {
      query = [
        { ...query, firstName: Like(`%${searchKey}%`) },
        { ...query, lastName: Like(`%${searchKey}%`) },
        { ...query, middleName: Like(`%${searchKey}%`) },
        { ...query, mobile: Like(`%${searchKey}%`) },
        { ...query, email: Like(`%${searchKey}%`) },
      ];
    }
    const users = await this.usersRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : total,
    });
    return {
      results: users,
      total,
    };
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.findById(id);
    await this.usersRepository.softRemove(result);
  }
}
