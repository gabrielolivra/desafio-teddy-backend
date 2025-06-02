import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './dtos/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
