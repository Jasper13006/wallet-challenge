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
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Create Users!')
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.usersService.create(createUserDto);
  }

  @ApiTags('Get User!')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    const response = await this.usersService.findOne(+id);
    return response;
  }

}
