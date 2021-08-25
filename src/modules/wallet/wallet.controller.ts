import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { patchMovement, patchResponse } from './dto/wallet-movements.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryListMovementDto } from './dto/wallet-movements.dto';
import { ResponsePaginationDto } from './dto/response-pagination';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiTags('Deposit or Extraction')
  @ApiOperation({ description: 'Enum types: extraction | deposit' })
  @Patch()
  async depositOrExtraction(
    @Body() data: patchMovement,
  ): Promise<patchResponse> {
    return await this.walletService.depositOrExtraction(data);
  }

  @ApiTags('Get Movements')
  @Get('/:userId/movements')
  getMovementOfAWallet(
    @Param('userId') userId: number,
    @Query() query: QueryListMovementDto,
  ): Promise<ResponsePaginationDto> {
    return this.walletService.getMovementOfAWallet({ userId, ...query });
  }
}
