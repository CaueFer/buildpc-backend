import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { ComponenteService } from "../services/componente.service";
import { Componente } from "../componente.entity";
import { forbiddenItems } from "src/rules/forbiddenItems";

@Controller("api/componentes")
export class ComponenteController {
  constructor(private readonly componenteService: ComponenteService) {}

  @Get()
  async findAll(): Promise<Componente[]> {
    return this.componenteService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Componente> {
    return this.componenteService.findOne(id);
  }

  @Post()
  async create(@Body() componente: Componente): Promise<Componente> {
    return this.componenteService.create(componente);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() componenteData: Componente,
    @Res() res
  ): Promise<Componente> {
    const componentId = parseInt(id, 10);

    if (forbiddenItems.nonEditableComponentIds.includes(componentId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Sem permissão para editar este componente" });
    }

    return this.componenteService.update(componentId, componenteData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res): Promise<void> {
    const componentId = parseInt(id, 10);

    if (forbiddenItems.nonEditableComponentIds.includes(componentId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Sem permissão para remover este componente" });
    }

    await this.componenteService.remove(componentId);
    return res
      .status(HttpStatus.OK)
      .json({ message: "Componente removido com sucesso" });
  }
}
