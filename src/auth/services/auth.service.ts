import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const userArray = await this.usersService.findOne(email);
    if (!userArray || userArray.length === 0) {
      throw new UnauthorizedException();
    }
    const user = userArray[0];

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      }),
    };
  }
}
