import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersModule } from './counters/counters.module';
import { AppController } from './app.controller';
import { CountersService } from './counters/counters.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sglpweb'),
    CountersModule,
  ],
  controllers: [AppController], // Registrar AppController
  providers: [],
})
export class AppModule {}
