import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ required: true, unique: true })
  entity: string; // Nombre de la entidad

  @Prop({ required: true })
  value: number; // Valor actual del contador
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
