import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementRepository, MovementTypeRepository, WalletRepository, WalletTypeRepository } from './wallet.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WalletRepository,
      WalletTypeRepository,
      MovementRepository,
      MovementTypeRepository,
    ])
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule { }
