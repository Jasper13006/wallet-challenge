import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  patchMovement,
  patchResponse,
  ServiceListMovementDto,
} from './dto/wallet-movements.dto';
import { CreateAllWalletsDto, CreateWalletDto } from './dto/create-wallet.dto';
import { PersistMovementDto } from './dto/wallet-movements.dto';
import { Movement, Wallet } from './entities';
import {
  MovementRepository,
  WalletRepository,
  WalletTypeRepository,
} from './wallet.repository';
import { createPagination } from 'src/common/createPagination';
import { ResponsePaginationDto } from './dto/response-pagination';

@Injectable()
export class WalletService {
  constructor(
    private walletRepository: WalletRepository,
    private walletTypeRepository: WalletTypeRepository,
    private movementRepository: MovementRepository,
  ) {}

  async createAllWalletsForUser(
    createAllWalletsDto: CreateAllWalletsDto,
  ): Promise<Wallet[]> {
    const { userId } = createAllWalletsDto;
    const wallets = await this.walletTypeRepository.find();
    const promises = wallets.map((w) => {
      const { id: walletTypeId, name: walletName } = w;
      return this.walletRepository.save(
        this.walletRepository.create({ userId, walletTypeId, walletName }),
      );
    });
    const resolve = await Promise.all(promises);
    return resolve;
  }

  async depositOrExtraction(data: patchMovement): Promise<patchResponse> {
    if (data.type === 'deposit') return await this.deposit(data);
    if (data.type === 'extraction') return await this.extraction(data);
  }

  async deposit(data: patchMovement): Promise<patchResponse> {
    const wallet = await this.getWallet(data.walletId);
    const newBalance = Number(data.amount) + Number(wallet.balance);
    wallet.balance = newBalance;
    const movementData: PersistMovementDto = {
      userId: wallet.userId,
      amount: data.amount,
      walletTypeId: wallet.walletTypeId,
      movementType: data.type,
      walletId: wallet.id,
    };
    await this.createMovement(movementData);
    const response = await this.walletRepository.save(wallet);
    return {
      message: `Correct deposit. New balance: ${response.balance} ${response.walletName}`,
      newBalance: response.balance,
      walletName: response.walletName,
    };
  }

  async extraction(data: patchMovement): Promise<patchResponse> {
    const wallet = await this.getWallet(data.walletId);
    const newBalance = Number(wallet.balance) - Number(data.amount);
    if (Math.sign(newBalance) === -1) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `You do not have sufficient funds to withdraw`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    wallet.balance = newBalance;
    const movementData: PersistMovementDto = {
      userId: wallet.userId,
      amount: data.amount,
      walletTypeId: wallet.walletTypeId,
      movementType: data.type,
      walletId: wallet.id,
    };
    await this.createMovement(movementData);
    const response = await this.walletRepository.save(wallet);
    return {
      message: `Correct Extraction. New balance: ${response.balance} ${response.walletName}`,
      newBalance: response.balance,
      walletName: response.walletName,
    };
  }

  async getWallet(walletId: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(walletId);
    if (!wallet) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Wallet with #${walletId} ID nonexistent`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return wallet;
  }

  async getMovementOfAWallet(
    query: ServiceListMovementDto,
  ): Promise<ResponsePaginationDto> {
    let queryWallet: { userId: number; walletName?: string } = {
      userId: query.userId,
    };
    query.walletType ? (queryWallet.walletName = query.walletType) : '';
    const wallets = await this.walletRepository.find({
      where: queryWallet,
    });
    if (wallets.length === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `There are no wallets for that user`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const where: {
      userId: number;
      walletTypeId?: number;
      movementType?: string;
    } = {
      userId: query.userId,
    };
    wallets.length === 1 ? (where.walletTypeId = wallets[0].walletTypeId) : '';
    query.movementType ? (where.movementType = query.movementType) : '';
    const movements = await this.movementRepository.findAndCount({
      where,
      take: query.limit,
      skip: query.offset,
    });

    return createPagination(
      movements[0],
      query.limit,
      query.offset,
      movements[1],
    );
  }

  async createMovement(data: PersistMovementDto): Promise<void> {
    await this.movementRepository.save(this.movementRepository.create(data));
  }

  async createWalletsTypes() {
    const walletsTypes = ['ARS', 'USDT', 'BTC'];
    const promises = walletsTypes.map((name) => {
      return this.walletTypeRepository.save(
        this.walletTypeRepository.create({ name }),
      );
    });
    const resolve = await Promise.all(promises);
    return resolve;
  }
}
