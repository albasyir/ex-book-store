import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsIdetifierDuplicate implements ValidatorConstraintInterface {
  private identifierName;

  constructor(protected readonly userService: UserService) {
    console.log(this.userService);
  }

  defaultMessage() {
    return `${this.identifierName} has been used`;
  }

  /**
   *
   *
   */
  async validate(identifier: string) {
    this.identifierName = identifier;
    return true;
    // TODO: fix this issue
    // const is_not_exists = !this.userService.findOneByIdentifierOrId(identifier);
    // return is_not_exists;
  }
}
