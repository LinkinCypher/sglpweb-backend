import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  // Crear una nueva tarea
  async createTask(data: Partial<Task>, userId: string): Promise<Task> {
    const assignedTo = data.assignedTo || userId; // Si no se asigna, el creador será el asignado
    const newTask = new this.taskModel({ ...data, createdBy: userId, assignedTo });
    return await newTask.save();
  }

  // Obtener tareas asignadas a un usuario
  async getTasksByAssignedTo(userId: string): Promise<Task[]> {
    return this.taskModel.find({ assignedTo: userId }).exec();
  }

  // Obtener una tarea por ID y usuario asignado
  async getTaskByIdAndAssignedTo(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, assignedTo: userId }).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found or not accessible.`);
    }
    return task;
  }

  // Actualizar una tarea por usuario asignado
  async updateTaskByAssignedTo(id: string, data: Partial<Task>, userId: string): Promise<Task> {
    const updatedTask = await this.taskModel
      .findOneAndUpdate({ _id: id, assignedTo: userId }, data, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found or not accessible.`);
    }
    return updatedTask;
  }

  // Eliminar una tarea por usuario asignado
  async deleteTaskByAssignedTo(id: string, userId: string): Promise<Task> {
    const deletedTask = await this.taskModel
      .findOneAndUpdate({ _id: id, assignedTo: userId }, { estado: 'eliminada' }, { new: true })
      .exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found or not accessible.`);
    }
    return deletedTask;
  }
}
