import { IsNotEmpty, IsString, IsIn, IsEmail, Validate, IsEnum } from 'class-validator';
import { LoginDto } from './login.dto';
import { USER_ROLE } from 'src/user/user.contants';
import { IsIdetifierDuplicate } from './validation/is-identifier-duplicate.validation';

export class RegistrationDto extends LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsIdetifierDuplicate)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(USER_ROLE, {
    message:
      'Invalid role. Must be either ' + Object.values(USER_ROLE).join(', '),
  })
  role: USER_ROLE;
}
