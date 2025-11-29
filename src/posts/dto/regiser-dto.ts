import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {
    @IsEmail({},{message: "Enter valid Email"})
    email: string;

    @IsString({message: "Name must be string"})
    @IsNotEmpty({message: "Enter your name"})
    @MinLength(3, {message: "name must be at least 3 characters long"})
    @MaxLength(50, {message: "Name can't exceed more than 50"})
    name: string;

    @IsNotEmpty({message: "Enter your name"})
    @MinLength(6, {message: "Password must be at least 6 characters long"})

    password: string;
}