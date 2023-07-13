import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SigninUserDTO{
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}