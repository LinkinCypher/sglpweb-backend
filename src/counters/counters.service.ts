import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './schemas/counter.schema';

@Injectable()
export class CountersService {
  constructor(@InjectModel(Counter.name) private counterModel: Model<Counter>) {}

  // Obtener el siguiente valor del contador para una entidad específica
  async getNextValue(entity: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { entity }, // Buscar el contador por entidad
      { $inc: { value: 1 } }, // Incrementar el valor en 1
      { new: true, upsert: true } // Crear el documento si no existe
    );
    return counter.value;
  }
}
