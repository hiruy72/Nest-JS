import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class LoginDto {
    @IsEmail({},{message: "Enter valid Email"})
    email: string;

    @IsNotEmpty({message: "Enter your name"})
    @MinLength(6, {message: "Password must be at least 6 characters long"})
    password: string;
}