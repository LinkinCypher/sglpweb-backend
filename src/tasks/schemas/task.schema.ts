import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema'; // Importar el esquema de usuario

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  fechaLimite: Date;

  @Prop({ required: true, default: 'pendiente', enum: ['pendiente', 'en progreso', 'completada'] })
  estado: string;

  @Prop({ required: true })
  casoId: string; // Relación con el caso

  @Prop({ type: [String], default: [] })
  evidencias: string[]; // Lista de URLs o rutas de archivos adjuntos

  @Prop({ required: true }) // Usuario creador
  createdBy: string;

  @Prop({ type: Types.ObjectId, ref: 'User' }) // Usuario asignado con referencia a User
  assignedTo: Types.ObjectId | User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
