import { Body, Controller, Get, Post, UseGuards, Req, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { successResponse } from '../config/responses.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { identifier: string; password: string }, @Res() res) {
    return this.authService.validateUser(body.identifier, body.password, res);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req, @Res() res) {
    return res
    .status(HttpStatus.OK)
    .json(successResponse(req.user, 'User profile decoded from JWT'))
  }
}
