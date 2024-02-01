import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/registration.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(identifier: string, pass: string): Promise<{ token: string }> {
    const user = await this.userService.findOneByIdentifierOrId(identifier);

    if (!user) {
      return Promise.reject("can't find user");
    }

    if (!this.verifyHash(pass, user.password)) {
      return Promise.reject('password is wrong');
    }

    const { password: _, ...result } = user;

    return {
      token: await this.jwtService.signAsync(result),
    };
  }

  async register(registrationDto: RegistrationDto) {
    const { email: identifier, ...userInfo } = registrationDto;

    userInfo.password = await this.makeHash(userInfo.password);

    return await this.userService.create({
      identifier,
      ...userInfo,
    });
  }

  async makeHash(plain: string): Promise<string> {
    return bcrypt.hashSync(plain, 10);
  }

  async verifyHash(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
