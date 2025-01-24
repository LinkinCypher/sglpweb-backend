import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly users = [
    { id: '1', username: 'admin', password: 'admin' }, // Usuario de prueba
  ];

  async login(username: string, password: string): Promise<string | null> {
    const user = this.users.find((u) => u.username === username && u.password === password);
    if (!user) {
      return null;
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      'mi_clave_secreta', // Cambiar por la clave secreta de tu proyecto
      { expiresIn: '1h' },
    );
    return token;
  }
}
