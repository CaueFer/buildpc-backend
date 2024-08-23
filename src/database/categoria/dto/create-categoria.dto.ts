import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";
import { Componente } from "src/database/componente/componente.entity";

export class CreateCategoriaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ type: [Componente] })
  componentes: Componente[];
}
