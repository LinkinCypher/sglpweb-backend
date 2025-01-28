import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case } from './schemas/case.schema';
import { Task } from '../tasks/schemas/task.schema';
import { CountersService } from '../counters/counters.service';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(Case.name) private caseModel: Model<Case>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private countersService: CountersService,
  ) {}

  // Listar todos los casos (sin filtrar por usuario)
  async findAll(): Promise<Case[]> {
    return this.caseModel.find({ activo: true }).exec();
  }

  // Listar casos del usuario autenticado
  async findAllByUser(userId: string): Promise<Case[]> {
    return this.caseModel.find({ createdBy: userId, activo: true }).exec();
  }

  // Crear un caso
  async createCase(createCaseDto: any, userId: string): Promise<Case> {
    const nextValue = await this.countersService.getNextValue('cases');
    const numeroCaso = `CASO-${String(nextValue).padStart(4, '0')}`;
    const newCase = new this.caseModel({
      ...createCaseDto,
      numeroCaso,
      createdBy: userId,
    });
    return newCase.save();
  }

  // Actualizar un caso
  async updateCase(caseId: string, updateCaseDto: any, userId: string): Promise<Case | null> {
    return this.caseModel
      .findOneAndUpdate(
        { _id: caseId, createdBy: userId, activo: true },
        updateCaseDto,
        { new: true },
      )
      .exec();
  }

  // Eliminar un caso lógicamente
  async deleteCase(caseId: string, userId: string): Promise<Case | null> {
    return this.caseModel
      .findOneAndUpdate(
        { _id: caseId, createdBy: userId, activo: true },
        { activo: false },
        { new: true },
      )
      .exec();
  }

  // Obtener casos con tareas asociadas
  async getCasesWithTasks(): Promise<any[]> {
    // Obtener todos los casos activos
    const cases = await this.caseModel.find({ activo: true }).lean().exec();

    // Obtener todas las tareas activas
    const tasks = await this.taskModel.find().lean().exec();

    // Combinar casos con sus tareas relacionadas
    return cases.map((caso) => ({
      ...caso,
      tareas: tasks.filter((task) => task.casoId === caso._id.toString()), // Relacionar tareas por casoId
    }));
  }
}
