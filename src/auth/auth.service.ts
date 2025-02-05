import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { errorResponse, successResponse } from '../config/responses.config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
      ) {}
    
      async validateUser(identifier: string, password: string, @Res() res) {
        const user = await this.userService.findByUsernameOrEmail(identifier);
        if (user && (await bcrypt.compare(password, user.password_hash))) {
          return res
          .status(HttpStatus.OK)
          .json(successResponse({ access_token: this.jwtService.sign({ username: user.username, email: user.email, sub: user.id }) }, 'Login successful'));
        }
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(errorResponse('Invalid credentials', 'Authentication failed'));
    }

}
