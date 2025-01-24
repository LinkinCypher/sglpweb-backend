import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersModule } from './counters/counters.module';
import { AppController } from './app.controller';
import { CasesModule } from './cases/cases.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sglpweb'),
    CountersModule,
    CasesModule, // Registrar el módulo de casos
    AuthModule,
  ],
  controllers: [AppController], // Registrar AppController
  providers: [],
})
export class AppModule {}
