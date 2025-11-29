import { Post } from "src/posts/entities/post-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = "user",
    ADMIN= "admin"
}

@Entity()

export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()

    name: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })

    @OneToMany(()=>Post, (post)=> post.autherName)
    posts: Post[];
}