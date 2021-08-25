import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlagRepository } from './mock.repository';
import { UsersModule } from '../users/users.module';
import { WalletModule } from '../wallet/wallet.module';
import { UsersService } from '../users/users.service';
import { WalletService } from '../wallet/wallet.service';
import { UserRepository } from '../users/user.repository';
import {
  MovementRepository,
  WalletRepository,
  WalletTypeRepository,
} from '../wallet/wallet.repository';

@Module({
  imports: [
    UsersModule,
    WalletModule,
    TypeOrmModule.forFeature([
      FlagRepository,
      UserRepository,
      WalletRepository,
      MovementRepository,
      WalletTypeRepository,
    ]),
  ],
  controllers: [MockController],
  providers: [MockService, UsersService, WalletService],
})
export class MockModule {}
