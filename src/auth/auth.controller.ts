import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }): Promise<{ token: string }> {
    const { username, password } = body;
    const token = await this.authService.login(username, password);

    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return { token };
  }

  // Obtener todos los usuarios
  @Get('users')
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.authService.getAllUsers();
  }
}
