import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { IsIdetifierDuplicate } from './dto/validation/is-identifier-duplicate.validation';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, IsIdetifierDuplicate],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'rahasia',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule { }
