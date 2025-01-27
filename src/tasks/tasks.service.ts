import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  // Crear una nueva tarea
  async createTask(data: Partial<Task>, userId: string): Promise<Task> {
    const newTask = new this.taskModel({ ...data, createdBy: userId });
    return await newTask.save();
  }

  // Obtener tareas por caso y usuario
  async getTasksByCaseAndUser(casoId: string, userId: string): Promise<Task[]> {
    return await this.taskModel.find({ casoId, createdBy: userId }).exec();
  }

  // Obtener tareas por usuario
  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskModel.find({ createdBy: userId }).exec();
  }

  // Obtener una tarea por ID y usuario
  async getTaskByIdAndUser(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, createdBy: userId }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found or not accessible.`);
    }
    return task;
  }

  // Actualizar una tarea por usuario
  async updateTaskByUser(id: string, data: Partial<Task>, userId: string): Promise<Task> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate({ _id: id, createdBy: userId }, data, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found or not accessible.`);
    }
    return updatedTask;
  }

  // Eliminar una tarea por usuario
  async deleteTaskByUser(id: string, userId: string): Promise<Task> {
    const deletedTask = await this.taskModel
      .findOneAndUpdate({ _id: id, createdBy: userId }, { estado: 'eliminada' }, { new: true })
      .exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found or not accessible.`);
    }
    return deletedTask;
  }
}
