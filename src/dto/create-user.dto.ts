import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsEmail()
    email: string
}