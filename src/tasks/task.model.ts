import { Task, TaskSchema } from './schemas/task.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  exports: [MongooseModule],
})
export class TaskModelModule {}
