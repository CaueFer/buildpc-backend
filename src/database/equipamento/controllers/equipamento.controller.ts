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
import { EquipamentoService } from "../services/equipamento.service";
import { Equipamento } from "../equipamento.entity";
import { forbiddenItems } from "src/rules/forbiddenItems";

@Controller("api/equipamentos")
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Get()
  async findAll(@Res() res): Promise<Equipamento[] | string> {
    try {
      const result = await this.equipamentoService.findAll();

      if (!result) {
        return res
          .status(HttpStatus.OK)
          .json({ message: "Nenhum equipamento cadastrado!" });
      }

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error.message);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Erro ao buscar equipamentos" });
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Equipamento> {
    return this.equipamentoService.findOne(id);
  }

  @Post()
  async create(@Body() equipamento: Equipamento): Promise<Equipamento> {
    return this.equipamentoService.create(equipamento);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() equipamentoData: Equipamento,
    @Res() res
  ): Promise<Equipamento> {
    const equipamentoId = parseInt(id, 10);

    if (forbiddenItems.nonEditableEquipamentIds.includes(equipamentoId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Sem permissão para editar este equipamento" });
    }

    return this.equipamentoService.update(equipamentoId, equipamentoData);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Res() res): Promise<void> {
    const equipamentoId = parseInt(id, 10);

    if (forbiddenItems.nonEditableEquipamentIds.includes(equipamentoId)) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Sem permissão para remover este equipamento" });
    }

    await this.equipamentoService.remove(equipamentoId);
    return res
      .status(HttpStatus.OK)
      .json({ message: "Equipamento removido com sucesso" });
  }
}
