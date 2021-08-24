import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/respons-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const response = await this.usersService.findOne(+id);
    return response;
  }

}
