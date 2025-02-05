import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  @Get()
  checkHealth() {
    return { status: 'OK' };
  }
}
