import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Componente } from '../componente.entity';

@Injectable()
export class ComponenteService {
  constructor(
    @InjectRepository(Componente)
    private componenteRepository: Repository<Componente>,
  ) {}

  async findAll(): Promise<Componente[]> {
    return this.componenteRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Componente> {
    return this.componenteRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async create(componente: Componente): Promise<Componente> {
    return this.componenteRepository.save(componente);
  }

  async update(id: number, componenteData: Componente): Promise<Componente> {
    const componente = await this.findOne(id);
    if (!componente) {
      throw new NotFoundException(`Componente com id ${id} não encontrado`);
    }

    componente.nome = componenteData.nome;
    componente.descricao = componenteData.descricao;

    return await this.componenteRepository.save(componente);
  }

  async remove(id: number): Promise<void> {
    await this.componenteRepository.delete(id);
  }
}
