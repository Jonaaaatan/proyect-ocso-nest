import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    userEmail: string;
    @IsString()
    @MaxLength(8)
    userPassword: string
}
