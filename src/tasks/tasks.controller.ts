import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Crear una nueva tarea
  @Post()
  async createTask(@Body() data: Partial<Task>): Promise<Task> {
    return await this.tasksService.createTask(data);
  }

  // Obtener todas las tareas de un caso
  @Get('case/:casoId')
  async getTasksByCase(@Param('casoId') casoId: string): Promise<Task[]> {
    return await this.tasksService.getTasksByCase(casoId);
  }

  // Obtener todas las tareas creadas por el usuario autenticado
  @UseGuards(AuthGuard)
  @Get('user')
  async getTasksByUser(@Req() req: any): Promise<Task[]> {
    const userId = req.user.id; // ID del usuario autenticado, extraído del token JWT
    return await this.tasksService.getTasksByUser(userId);
  }

  // Actualizar una tarea
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: Partial<Task>): Promise<Task> {
    return await this.tasksService.updateTask(id, data);
  }

  // Eliminar una tarea (eliminación lógica)
  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.deleteTask(id);
  }
}
