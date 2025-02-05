import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { errorResponse } from '../config/responses.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;
    
    if (!authHeader) {
      throw new UnauthorizedException(errorResponse('No authentication token provided', 'Unauthorized'));
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(errorResponse('Invalid or expired token', 'Unauthorized'));
    }
  }
}
