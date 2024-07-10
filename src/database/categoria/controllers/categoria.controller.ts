import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { Categoria } from '../categoria.entity';
import { CategoriaService } from '../services/categoria.service';

@Controller('api/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Post()
  async create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() categoria: Categoria, @Res() res): Promise<Categoria> {
    const updatedCategoria = await this.categoriaService.update(id, categoria);
    return res.status(HttpStatus.OK).json(updatedCategoria);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res): Promise<void> {
    await this.categoriaService.remove(id);
    return res.status(HttpStatus.OK).json({ message: 'Categoria removida com sucesso' });
  }
}
