import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Case, CaseSchema } from './schemas/case.schema';
import { CountersModule } from '../counters/counters.module';
import { TasksModule } from '../tasks/tasks.module'; // Importar TasksModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]),
    CountersModule,
    TasksModule, // Agregar TasksModule
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
