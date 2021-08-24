import { EntityRepository, Repository } from 'typeorm';
import { Movement, MovementType, Wallet, WalletType } from './entities/index';

@EntityRepository(Movement)
export class MovementRepository extends Repository<Movement> {
    constructor() {
        super();
    }

}

@EntityRepository(MovementType)
export class MovementTypeRepository extends Repository<MovementType> {
    constructor() {
        super();
    }

}

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
    constructor() {
        super();
    }

}

@EntityRepository(WalletType)
export class WalletTypeRepository extends Repository<WalletType> {
    constructor() {
        super();
    }

}
