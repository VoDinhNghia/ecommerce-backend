import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dtos/users.create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async initSuperAdmin(userDto: CreateUserDto): Promise<void> {
    const code = 'SA_2023_ecommerce';
    const existedAdmin = await this.usersRepository.findOne({
      where: { code },
    });
    if (!existedAdmin) {
      await this.usersRepository.save({ ...userDto, code });
    }
  }
}
