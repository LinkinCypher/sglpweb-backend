import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const TaskSchema = SchemaFactory.createForClass(Task);
