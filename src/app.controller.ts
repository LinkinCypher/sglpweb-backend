import { Controller, Get, Param } from '@nestjs/common';
import { CountersService } from './counters/counters.service';

@Controller()
export class AppController {
  constructor(private readonly countersService: CountersService) {}

  @Get('test-counter/:entity')
  async testCounter(@Param('entity') entity: string) {
    const nextValue = await this.countersService.getNextValue(entity);
    return { entity, nextValue };
  }
}
