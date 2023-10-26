import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Like, Repository } from 'typeorm';
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
import { deleteDto } from 'src/utils/utils.delete.dto';

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
    const { email } = userDto;
    const existedEmail = await this.usersRepository.findOneBy({
      email,
    });
    if (existedEmail) {
      new CommonException(statusCodeRes.CONFLICT, userMsg.existedEmail);
    }
    const result = await this.usersRepository.save({
      ...userDto,
      code: new GenerateCode().getCodeUser(7),
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
    await this.findById(id);
    const userUpdateDto = {
      ...updateDto,
      updatedAt: Date.now(),
    };
    await this.usersRepository.update(id, userUpdateDto);
  }

  async findAllUsers(
    queryDto: UserQueryDto,
  ): Promise<{ results: UserResponseDto[]; total: number }> {
    const { searchKey, limit, page } = queryDto;
    let query: IqueryUser | IqueryBySearchKey = { isDeleted: false };
    const total = await this.usersRepository.countBy(query);
    if (searchKey) {
      query = [
        { ...query, firstName: Like(`%${searchKey}%`) },
        { ...query, lastName: Like(`%${searchKey}%`) },
        { ...query, middleName: Like(`%${searchKey}%`) },
      ];
    }
    const users = await this.usersRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * Number(page) - Number(limit) : null,
      take: limit || total,
    });
    return {
      results: users,
      total,
    };
  }

  async deleteUser(id: string): Promise<void> {
    await this.findById(id);
    await this.usersRepository.update(id, deleteDto);
  }
}
