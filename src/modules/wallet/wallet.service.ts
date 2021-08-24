import { Injectable } from '@nestjs/common';
import { CreateAllWalletsDto, CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { MovementRepository, MovementTypeRepository, WalletRepository, WalletTypeRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    private walletRepository: WalletRepository,
    private walletTypeRepository: WalletTypeRepository,
    private movementRepository: MovementRepository,
    private movementTypeRepository: MovementTypeRepository
  ) { }
  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new walletr';
  }

  async createAllWalletsForUser(createAllWalletsDto: CreateAllWalletsDto) {
    const { userId } = createAllWalletsDto
    const wallets = await this.walletTypeRepository.find()
    const promises = wallets.map((w) => {
      const { id: walletTypeId,name:walletName } = w
      return this.walletRepository.save(this.walletRepository.create({ userId, walletTypeId,walletName }))
    })
    const resolve = await Promise.all(promises)
    return resolve;
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletq`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} walletw`;
  }

  async createWalletsTypes() {
    const walletsTypes = ['ARS', 'USDT', 'BTC']
    const promises = walletsTypes.map((name) => {
      return this.walletTypeRepository.save(this.walletTypeRepository.create({ name }))
    })
    const resolve = await Promise.all(promises)
    return resolve
  }
}
