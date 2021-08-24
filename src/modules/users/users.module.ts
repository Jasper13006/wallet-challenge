import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from '../wallet/wallet.module';
import { MovementRepository, MovementTypeRepository, WalletRepository, WalletTypeRepository } from '../wallet/wallet.repository';
import { WalletService } from '../wallet/wallet.service';

@Module({
  imports: [
    WalletModule,
    TypeOrmModule.forFeature([
      UserRepository,
      WalletRepository,
      WalletTypeRepository,
      MovementTypeRepository,
      MovementRepository
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, WalletService]
})
export class UsersModule { }
