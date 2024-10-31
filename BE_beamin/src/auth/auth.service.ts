import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { createHmac } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService, 
  ) {}

  async signUp(body: Omit<users, 'id'>) {
    try {
      const newUser = await this.usersService.create({
        ...body,
        password: this.hashPass(body.password)
      });
      return { success: true, user: newUser };
    } catch (error) {
      throw new HttpException("Error can't create user", HttpStatus.BAD_REQUEST);
    }
  }

  async login(body:  Pick<users, 'email' | 'password'>) {
    try {
      const { email, password } = body;

      const user = await this.usersService.findByEmail(email); 
   
      const hashedPassword = this.hashPass(password);
      if (hashedPassword !== user.password) {
        throw new UnauthorizedException('Invalid password');
      }

      const token = this.jwtService.sign({ userId: user.id });
      return { success: true, user, token };
    } catch (error) {
      throw new HttpException("Error not match user", HttpStatus.FORBIDDEN);
    }
  }

  hashPass(pass: string) {
    return createHmac('sha256', process.env.SECRET_KEY_AUTH)
      .update(pass)
      .digest('hex');
  }
}
