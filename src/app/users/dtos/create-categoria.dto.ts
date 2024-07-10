
import { RegexHelper } from "../../../helpers/regex.helper";
import { MessagesHelper } from "../../../helpers/messages.helper";
import { IsNotEmpty, Matches } from "class-validator";

export class CreateCategoriaDto {
    @IsNotEmpty()
    nome: string;
}