import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { walletTypeEnum } from '../wallet/dto/wallet-movements.dto';
import { WalletService } from '../wallet/wallet.service';
import { FlagRepository } from './mock.repository';
import { dataToMock } from './utils/user-data';

@Injectable()
export class MockService {
  constructor(
    private flagRepository: FlagRepository,
    private walletService: WalletService,
    private userServive: UsersService,
  ) {}
  async create() {
    const checkFlag = await this.checkFlag('mock1');
    console.log(checkFlag);
    if (checkFlag) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          message: `Mock created in the past`,
        },
        HttpStatus.OK,
      );
    }
    const walletTypes = await this.walletService.createWalletsTypes();
    console.info('WalletTypes created =>', walletTypes);
    const promises = dataToMock.map((userMock) => {
      return this.userServive.create(userMock);
    });
    const promisesResolved = await Promise.all(promises);
    console.info('Users Mock Created =>', promisesResolved);
    await this.createFlag('mock1');
    return 'Mock Created';
  }

  async createFlag(name: string): Promise<void> {
    await this.flagRepository.save(
      this.flagRepository.create({ nameMock: name }),
    );
  }

  async checkFlag(name: string): Promise<boolean> {
    console.log(name);
    const flag = await this.flagRepository.find({ where: { nameMock: name } });
    console.log(flag);
    if (flag.length === 0) return false;
    return true;
  }
}
