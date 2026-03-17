import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users/users.entity';
import { AuthService } from './auth/auth.service';

interface UserExport {
  user: User;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Request() req: UserExport): User {
    return req.user;
  }

  @Post('auth/register')
  async register(@Body() user: User) {
    return await this.authService.register(user);
  }
}
