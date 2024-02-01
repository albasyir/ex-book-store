import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Public } from './decorators/http/is-public.http-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  async signIn(@Body() credential: LoginDto) {
    return this.authService
      .signIn(credential.email, credential.password)
      .catch(() => {
        throw new UnauthorizedException();
      });
  }

  @Post('register')
  @Public()
  async register(@Body() registrationDto: RegistrationDto) {
    return this.authService.register(registrationDto).catch((reason) => {
      throw new UnprocessableEntityException(reason);
    });
  }
}
