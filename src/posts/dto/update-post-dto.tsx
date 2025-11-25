import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePost {
    @IsOptional()
    @IsNotEmpty({message: "title is required"})
    @IsString({message: "Title must be a stirng"})
    @MinLength(3,{message: "Title must be 3 characters long"})
    @MaxLength(50,{message: "Title can't be longer than 50 characters"})
    title?:string;
    @IsOptional()
    @IsNotEmpty({message: "Content is required"})
    @IsString({message: "Content must be a stirng"})
    @MinLength(3,{message: "Content must be 3 characters long"})
    content: string;
    @IsOptional()
    @IsNotEmpty({message: "Auhtor is required"})
    @IsString({message: "Author name must be a stirng"})
    @MinLength(3,{message: "Auhtor Name must be 3 characters long"})
    authorName: string;
    
}