import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Crear una nueva tarea
  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() data: Partial<Task>, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    const assignedTo = data.assignedTo || userId; // Si no se asigna, se asigna al creador
    return await this.tasksService.createTask({ ...data, assignedTo }, userId);
  }

  // Obtener todas las tareas asignadas al usuario autenticado
  @UseGuards(AuthGuard)
  @Get('assigned')
  async getAssignedTasks(@Req() req: any): Promise<Task[]> {
    const userId = req.user.id; // ID del usuario autenticado
    return await this.tasksService.getTasksByAssignedTo(userId);
  }

  // Obtener una tarea por ID (validar que pertenece al usuario asignado)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTaskById(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    return this.tasksService.getTaskByIdAndAssignedTo(id, userId);
  }

  // Actualizar una tarea (validar que pertenece al usuario asignado)
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: Partial<Task>, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    return await this.tasksService.updateTaskByAssignedTo(id, data, userId);
  }

  // Eliminar una tarea (eliminación lógica)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    return await this.tasksService.deleteTaskByAssignedTo(id, userId);
  }
}
