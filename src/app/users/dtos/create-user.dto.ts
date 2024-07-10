
import { RegexHelper } from "../../../helpers/regex.helper";
import { MessagesHelper } from "../../../helpers/messages.helper";
import { IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @Matches(RegexHelper.password, {message: MessagesHelper.PASSWORD_VALID})
    password: string;
}