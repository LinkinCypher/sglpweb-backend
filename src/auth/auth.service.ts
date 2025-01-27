import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      'mi_clave_secreta',
      { expiresIn: '1h' }
    );

    return token;
  }

  // Método para obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).exec(); // Excluir el campo `password` en la respuesta
  }
}
