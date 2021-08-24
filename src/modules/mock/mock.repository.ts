import { EntityRepository, Repository } from 'typeorm';
import { Flag } from './entities/flag.entity';

@EntityRepository(Flag)
export class FlagRepository extends Repository<Flag> {
  constructor() {
    super();
  }
}
