import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async login(username: string, password: string): Promise<string | null> {
    // Busca al usuario en la base de datos
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verifica la contraseña (en este ejemplo, se compara directamente)
    // Usa una librería como bcrypt para cifrar y verificar contraseñas
    if (user.password !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Genera el token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'mi_clave_secreta', // Cambia por tu clave secreta segura
      { expiresIn: '1h' }
    );

    return token;
  }
}
