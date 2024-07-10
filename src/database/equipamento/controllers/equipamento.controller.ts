import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { EquipamentoService } from '../services/equipamento.service';
import { Equipamento } from '../equipamento.entity';

@Controller('api/equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Get()
  async findAll(@Res() res): Promise<Equipamento[] | string> {
    try {
      const result = await this.equipamentoService.findAll();

      if (!result) {
        return res.status(HttpStatus.OK).json({ message: "Nenhum equipamento cadastrado!" });
      }

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao buscar equipamentos' });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Equipamento> {
    return this.equipamentoService.findOne(id);
  }

  @Post()
  async create(@Body() equipamento: Equipamento): Promise<Equipamento> {
    return this.equipamentoService.create(equipamento);
  }
  
  @Put(':id')
  async update(@Param('id') id: number, @Body() equipamentoData: Equipamento): Promise<Equipamento> {
    return this.equipamentoService.update(id, equipamentoData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res): Promise<void> {
    await this.equipamentoService.remove(id);
    return res.status(HttpStatus.OK).json({ message: 'Equipamento removido com sucesso' });
  }

}
