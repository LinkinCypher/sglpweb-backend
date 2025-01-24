import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const token = await this.authService.login(loginDto.username, loginDto.password);
    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return { token };
  }
}
