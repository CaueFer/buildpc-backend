import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../categoria.entity';


@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    return this.categoriaRepository.findOne({
      where: { id },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(id: number, categoriaData: Categoria): Promise<Categoria> {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }

    categoria.nome = categoriaData.nome;

    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
