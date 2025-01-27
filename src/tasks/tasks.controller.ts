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
    const userId = req.user.id; // Obtén el ID del usuario autenticado
    return await this.tasksService.createTask(data, userId);
  }

  // Obtener todas las tareas de un caso
  @UseGuards(AuthGuard)
  @Get('case/:casoId')
  async getTasksByCase(@Param('casoId') casoId: string, @Req() req: any): Promise<Task[]> {
    const userId = req.user.id;
    return await this.tasksService.getTasksByCaseAndUser(casoId, userId);
  }

  // Obtener todas las tareas creadas por el usuario autenticado
  @UseGuards(AuthGuard)
  @Get('user')
  async getTasksByUser(@Req() req: any): Promise<Task[]> {
    const userId = req.user.id; // ID del usuario autenticado desde el token
    return this.tasksService.getTasksByUser(userId);
  }

  // Obtener una tarea por ID (validar que pertenece al usuario)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTaskById(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    return this.tasksService.getTaskByIdAndUser(id, userId);
  }

  // Actualizar una tarea (validar que pertenece al usuario)
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: Partial<Task>, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    return await this.tasksService.updateTaskByUser(id, data, userId);
  }

  // Eliminar una tarea (eliminación lógica)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const userId = req.user.id; // ID del usuario autenticado
    return await this.tasksService.deleteTaskByUser(id, userId);
  }
}
