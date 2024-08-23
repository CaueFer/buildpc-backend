import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from "@nestjs/common";
import { Categoria } from "../categoria.entity";
import { CategoriaService } from "../services/categoria.service";
import { forbiddenItems } from "../../../rules/forbiddenItems";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("categorias")
@Controller("api/categorias")
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get("test")
  async test() {
    return "Hello Word";
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Post()
  async create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() categoria: Categoria,
    @Res() res
  ): Promise<Categoria> {
    const categoryId = parseInt(id, 10);

    if (forbiddenItems.nonEditableCategoryIds.includes(categoryId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Sem permissão para editar esta categoria" });
    }

    const updatedCategoria = await this.categoriaService.update(
      categoryId,
      categoria
    );
    return res.status(HttpStatus.OK).json(updatedCategoria);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res): Promise<void> {
    const categoryId = parseInt(id, 10);

    if (forbiddenItems.nonEditableCategoryIds.includes(categoryId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Sem permissão para remover esta categoria" });
    }

    await this.categoriaService.remove(categoryId);
    return res
      .status(HttpStatus.OK)
      .json({ message: "Categoria removida com sucesso" });
  }
}
