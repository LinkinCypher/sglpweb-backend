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

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new Error('Credenciales invalidas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Credenciales invalidas');

    const payload = { username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
