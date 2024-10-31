import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { users } from '@prisma/client';
import { AuthService } from './auth.service';

@ApiTags("User")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  @ApiOperation({ summary: 'dang ky' })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        firstname: { type: "string" },
        lastname: { type: "string" },
        username: { type: "string" },
        phonenumber: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      }
    }
  })
  signUp(
    @Body() body: Omit<users, 'id'>,
  ) {
    try {
      return this.authService.signUp(body)
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("login")
  @ApiOperation({ summary: 'dang nhap' })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      }
    }
  })
  login(
    @Body() body: Pick<users, 'email' | 'password'>,
  ) {
    try {
      return this.authService.login(body);
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
