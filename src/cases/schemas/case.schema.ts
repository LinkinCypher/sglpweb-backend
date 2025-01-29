import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] }) // Ahora es un array de usuarios
  assignedTo: Types.ObjectId[] | User[];

  @Prop({ default: true })
  activo: boolean;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
