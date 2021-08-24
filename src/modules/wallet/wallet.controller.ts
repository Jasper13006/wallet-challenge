import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { patchMovement } from '../users/dto/wallet-movements.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({description: 'Enum types: extraction | deposit'})
  @Patch()
  async depositOrExtraction(@Body() data:patchMovement) {
    return await this.walletService.depositOrExtraction(data);
  }

  // @Get('/create')
  // createWalletType() {
  //   return this.walletService.createMovementsTypes()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.walletService.findOne(+id);
  // }

}
