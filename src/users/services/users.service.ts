import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Users } from '../entity/users.entity';
import { CreateUserDto } from '../controllers/dtos/users.dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verifyUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (verifyUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    this.usersRepository.save(user);

    return {
      ...user,
      id: user.id,
      email: user.email,
    };
  }

  async findOne(email: string) {
    return await this.usersRepository.find({ where: { email } });
  }
}
