import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { usersEntity } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(usersEntity)
    private readonly usersRepository: Repository<usersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({ select: ['id', 'userName'] });
  }

  async findOneOrFail(options: FindOneOptions<usersEntity>) {
    try {
      return await this.usersRepository.findOneOrFail({
        ...options,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async create(data: CreateUserDto) {
    const user = this.usersRepository.create(data);

    return await this.usersRepository.save(user);
  }

  async update(id: any, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });

    this.usersRepository.merge(user, data);

    return await this.usersRepository.save(user);
  }

  async destroy(id: any) {
    await this.usersRepository.findOneOrFail({ where: { id } });

    await this.usersRepository.softDelete({ id });
  }
}
