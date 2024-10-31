import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { users } from '@prisma/client';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @ApiOperation({ summary: 'Tao user' })
  // @ApiBody({
  //   schema: {
  //     type: "object",
  //     properties: {
  //       firstname: { type: "string" },
  //       lastname: { type: "string" },
  //       username: { type: "string" },
  //       phonenumber: { type: "string" },
  //       email: { type: "string" },
  //       password: { type: "string" },
  //     }
  //   }
  // })
  // @Post()
  // create(@Body() createUserDto: Omit<users, 'id'>) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @ApiOperation({ summary: 'get all user' })
  findAll() {
    return this.usersService.findAll();
  }

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
  @ApiOperation({ summary: 'sua user' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Omit<users, 'id'>) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'del user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
