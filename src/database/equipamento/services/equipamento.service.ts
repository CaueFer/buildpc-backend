import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipamento } from '../equipamento.entity';

@Injectable()
export class EquipamentoService {
  constructor(
    @InjectRepository(Equipamento)
    private equipamentoRepository: Repository<Equipamento>,
  ) {}

  async findAll(): Promise<Equipamento[]> {
    try {
      const equipamentos = await this.equipamentoRepository.find({
        relations: ['componentes'],
      });

      if (equipamentos.length === 0) return null;

      return equipamentos;
    } 
    catch (error) {
      console.error('Erro ao buscar equipamentos:', error);

      throw new Error('Erro ao buscar equipamentos');
    }
  }

  async findOne(id: number): Promise<Equipamento> {
    return this.equipamentoRepository.findOne({
      where: { id },
      relations: ['componentes'],
    });
  }

  async create(equipamento: Equipamento): Promise<Equipamento> {
    return this.equipamentoRepository.save(equipamento);
  }

  async update(id: number, equipamentoData: Equipamento): Promise<Equipamento> {
    const componente = await this.findOne(id);
    if (!componente) {
      throw new NotFoundException(`Equipamento com id ${id} não encontrado`);
    }
    
    componente.nome = equipamentoData.nome;
    componente.componentes = equipamentoData.componentes;

    return await this.equipamentoRepository.save(componente);
  }

  async remove(id: number): Promise<void> {
    await this.equipamentoRepository.delete(id);
  }
}
