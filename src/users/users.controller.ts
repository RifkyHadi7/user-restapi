import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res) {
    return this.userService.registerUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
      res,
    );
  }
}
