import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly user: UserRepository) { }

  async findOneByIdentifierOrId(
    identifierOrId: string | number,
  ): Promise<User | undefined> {
    const is_id = typeof identifierOrId == 'number';
    const key: keyof User = is_id ? 'id' : 'identifier';

    return this.user.findOne({
      where: {
        [key]: identifierOrId,
      },
    });
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const otherUser = await this.findOneByIdentifierOrId(user.identifier);
    const is_duplicated = !!otherUser;

    if (is_duplicated) {
      return Promise.reject('user is duplicated');
    }

    return this.user.save(user);
  }
}
