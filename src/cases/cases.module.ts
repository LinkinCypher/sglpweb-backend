import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Case, CaseSchema } from './schemas/case.schema';
import { CountersModule } from '../counters/counters.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Case.name, schema: CaseSchema }]),
    CountersModule,
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
