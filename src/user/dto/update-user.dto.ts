import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    avatar: string;
}