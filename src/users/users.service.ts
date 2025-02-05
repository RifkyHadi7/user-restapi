import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { successResponse, errorResponse } from '../config/responses.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(
    username: string,
    email: string,
    password: string,
    @Res() res,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({
        username,
        email,
        password_hash: hashedPassword,
      });

      await this.userRepository.save(newUser);
      return res
        .status(HttpStatus.CREATED)
        .json(
          successResponse(
            { email: newUser.email },
            'User registered successfully',
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.CONFLICT)
        .json(errorResponse(error.message, 'User registration failed'));
    }
  }

  async findByUsernameOrEmail(identifier: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
  }
}
