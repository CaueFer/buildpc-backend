import { Injectable } from '@nestjs/common';
import { usersEntity } from 'src/app/users/users.entity';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/app/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}
  
  async validateUser(userName: string, password: string) {
    let user: usersEntity;
    try {
      user = await this.userService.findOneOrFail({ where: { userName } });
    } catch (error) {
      return null;
    }

    const isPassValid = compareSync(password, user.password);
    if (!isPassValid) return null;

    return user;
  }

  async login(user: usersEntity){
    const payload = { sub: user.id, userName: user.userName};

    return {
        token: this.jwtService.sign(payload)
    }
  }
}
