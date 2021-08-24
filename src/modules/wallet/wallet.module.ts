import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MovementRepository,
  WalletRepository,
  WalletTypeRepository,
} from './wallet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletRepository,
      WalletTypeRepository,
      MovementRepository,
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
