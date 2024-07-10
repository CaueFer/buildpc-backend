import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { ComponenteService } from '../services/componente.service';
import { Componente } from '../componente.entity';


@Controller('api/componentes')
export class ComponenteController {
  constructor(private readonly componenteService: ComponenteService) {}

  @Get()
  async findAll(): Promise<Componente[]> {
    return this.componenteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Componente> {
    return this.componenteService.findOne(id);
  }

  @Post()
  async create(@Body() componente: Componente): Promise<Componente> {
    return this.componenteService.create(componente);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() componenteData: Componente): Promise<Componente> {
    return this.componenteService.update(id, componenteData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res): Promise<void> {
    await this.componenteService.remove(id);
    return res.status(HttpStatus.OK).json({ message: 'Componente removido com sucesso' });
  }
}
