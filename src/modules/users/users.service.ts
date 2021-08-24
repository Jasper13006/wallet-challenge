import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/respons-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private walletService: WalletService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const toCreate = this.userRepository.create(createUserDto);
    const created = await this.userRepository.save(toCreate);
    if (created.id)
      await this.walletService.createAllWalletsForUser({ userId: created.id });
    return created;
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const queryUser = this.userRepository.find({
      select: ['id', 'name', 'lastName', 'alias', 'email'],
      relations: ['wallet'],
      where: { id },
    });
    const queryExecuted = await queryUser;

    if (queryExecuted.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with #${id} ID nonexistent`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const userResponse = queryExecuted[0];
    const { name, lastName, alias, email } = userResponse;
    const wallets = userResponse.wallet.map((w) => {
      return {
        balance: w.balance,
        walletName: w.walletName,
        text: `${w.balance} ${w.walletName}`,
      };
    });
    const user = {
      id,
      name,
      lastName,
      alias,
      email,
      wallets,
    };
    return user;
  }
}
