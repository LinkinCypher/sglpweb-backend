import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthRequest } from './auth-request.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No se encontró el token de autorización');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('El token no es válido');
    }

    try {
      const decoded = jwt.verify(token, 'mi_clave_secreta'); // Cambia por tu clave secreta
      request.user = decoded as any; // Asignar los datos del usuario al atributo `user`
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no válido o expirado');
    }
  }
}
