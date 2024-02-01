import { Injectable, Scope } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends Repository<User> {
  #cache_findOneByIdentifier: User;

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByIdentifier(identifier: string): Promise<User> {
    this.#cache_findOneByIdentifier ||= await this.findOne({
      where: { identifier },
    });

    return this.#cache_findOneByIdentifier;
  }
}
