import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string; // ID del usuario autenticado
    [key: string]: any; // Otros atributos del token
  };
}
