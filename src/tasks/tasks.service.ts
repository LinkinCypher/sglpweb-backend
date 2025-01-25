import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  // Crear una nueva tarea
  async createTask(data: Partial<Task>): Promise<Task> {
    const newTask = new this.taskModel(data);
    return await newTask.save();
  }

  // Obtener tareas por caso
  async getTasksByCase(casoId: string): Promise<Task[]> {
    return await this.taskModel.find({ casoId }).exec();
  }

  // Obtener tareas por usuario
  async getTasksByUser(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ createdBy: userId }).exec();
  }

  // Actualizar una tarea
  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return updatedTask;
  }

  // Eliminar una tarea (eliminación lógica)
  async deleteTask(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { estado: 'eliminada' }, // Suponiendo que "estado" maneja la eliminación lógica
      { new: true }
    ).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return deletedTask;
  }
}
