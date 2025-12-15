import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post.interface';
import { get } from 'http';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post-entity';
import { CreatePost } from './dto/create-post-dto';
import { UpdatePost } from './dto/update-post-dto';

@Injectable()
export class PostsService {

    constructor(
    @InjectRepository(Post)
    private postserv: Repository<Post>,
    ){}

    async findAll(): Promise<Post[]>{
        return this.postserv.find()
    }

    async findById(id:number): Promise<Post>  {
       const singlePost=  await this.postserv.findOneBy({id})

       if (!singlePost){
        throw new NotFoundException(`Post with ${id}  not found`);
       }

       return singlePost;
    }
    
    async create(createdPost: CreatePost): Promise<Post> {
        const newdata = this.postserv.create({
            title: createdPost.title,
            content: createdPost.content,
            autherName: createdPost.autherName,
        })

        return this.postserv.save(newdata)

    
    }

    // private getNextId(): number {
    //     return  this.posts.length > 0?
    //      Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    // }

    async update(id: number, updatedPost: UpdatePost): Promise<Post> {

        const targetUpdate= await this.findById(id)
        if(updatedPost.title){
            targetUpdate.title = updatedPost.title
        }
        if (updatedPost.content){
            targetUpdate.content= updatedPost.content
        }

        return this.postserv.save(targetUpdate)


    }
    async remove(id: number) : Promise<void> {
        const data = await this.findById(id)
        await  this.postserv.remove(data)
    }
}
