import { Body, Controller, Get, Post, UseGuards, Req, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { successResponse } from '../config/responses.config';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto : LoginDto, @Res() res) {
    return this.authService.validateUser(loginDto.identifier, loginDto.password, res);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req, @Res() res) {
    return res
    .status(HttpStatus.OK)
    .json(successResponse(req.user, 'User profile decoded from JWT'))
  }
}
