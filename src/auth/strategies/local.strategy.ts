import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'userName'});
  }

  async validate(userName: string, password: string) {
    const user = await this.authService.validateUser(userName, password);

    if (!user)
      throw new UnauthorizedException(
        MessagesHelper.PASSWORD_OR_USERNAME_INVALID,
      );

    return user;
  }
}
