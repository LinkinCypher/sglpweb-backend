import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Método para insertar un usuario administrador
  async seedAdminUser() {
    const existingAdmin = await this.userModel.findOne({ username: 'admin' });
  
    if (!existingAdmin) {
      const adminUser = new this.userModel({
        username: 'admin',
        password: '123456', // Contraseña sin encriptar
        role: 'admin',
      });
      await adminUser.save();
      console.log('Usuario administrador creado exitosamente.');
    } else {
      console.log('El usuario administrador ya existe.');
    }
  }
  



  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }



  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    // Comparación directa sin encriptación
    if (password !== user.password) {
      throw new Error('Contraseña incorrecta');
    }
  
    const payload = { username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);
  
    return { token };
  }
  

  
}
