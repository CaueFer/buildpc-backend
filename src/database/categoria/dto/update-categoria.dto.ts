import { ApiProperty } from "@nestjs/swagger";
import { Componente } from "src/database/componente/componente.entity";

export class UpdateCategoriaDto {
    @ApiProperty({
        description: 'Id de categoria já existente para editar'
    })
    id: number;
  
    @ApiProperty({
        description: 'Nome atualizado da categoria'
    })
    novoNome: string;
  
    @ApiProperty({
        description: 'Lista de componentes atualizada que utilizam a categoria'
    })
    novosComponentes: Componente[];
}