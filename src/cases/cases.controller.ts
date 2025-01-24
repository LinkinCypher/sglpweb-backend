import { Controller, Get, Post, Patch, Delete, Param, Body, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { CasesService } from './cases.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest } from '../auth/auth-request.interface';
import { Case } from './schemas/case.schema';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  // Endpoint para listar todos los casos
  @Get()
  async getAllCases(): Promise<Case[]> {
    return this.casesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: AuthRequest) {
    const userId = req.user.id; // Usuario autenticado
    return this.casesService.findAllByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCaseDto: any, @Req() req: AuthRequest) {
    const userId = req.user.id; // Usuario autenticado
    return this.casesService.createCase(createCaseDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCaseDto: any,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id; // Usuario autenticado
    const updatedCase = await this.casesService.updateCase(id, updateCaseDto, userId);
    if (!updatedCase) {
      throw new NotFoundException('Caso no encontrado o no autorizado');
    }
    return updatedCase;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: AuthRequest) {
    const userId = req.user.id; // Usuario autenticado
    const deletedCase = await this.casesService.deleteCase(id, userId);
    if (!deletedCase) {
      throw new NotFoundException('Caso no encontrado o no autorizado');
    }
    return { message: 'Caso eliminado lógicamente' };
  }
}
