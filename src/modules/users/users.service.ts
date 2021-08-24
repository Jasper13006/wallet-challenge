import { Injectable } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private walletService: WalletService
  ){}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const toCreate = this.userRepository.create(createUserDto)
    const created = await this.userRepository.save(toCreate)
    if(created.id) await this.walletService.createAllWalletsForUser({userId:created.id})
    return created;
  }

  async findOne(id: number) {
    const queryUser = this.userRepository.find({
      relations:['wallet'],
      where:{id}
    });
    console.log(await queryUser)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
