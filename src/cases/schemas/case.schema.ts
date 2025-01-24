import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Case extends Document {
  @Prop({ required: true, unique: true })
  numeroCaso: string;

  @Prop({ required: true })
  nombreCliente: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  fechaInicio: Date;

  @Prop()
  detalles?: string;

  @Prop({ required: true })
  createdBy: string; // Usuario que creó el caso

  @Prop({ default: true })
  activo: boolean; // Estado lógico del caso
}

export const CaseSchema = SchemaFactory.createForClass(Case);
