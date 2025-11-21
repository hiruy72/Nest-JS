import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { get } from 'http';

@Injectable()
export class PostsService {

    private posts: Post[] = [
        {
            id: 1,
            title: 'First Post',
            content: 'This is the content of the first post.',
            authorName: 'John Doe',
            createdAt: new Date(),
        },
        {
            id: 2,
            title: 'Second Post',
            content: 'This is the content of the second post.',
            authorName: 'Jane Smith',
            createdAt: new Date(),
        }
    ];

    findAll(): Post[]{
        return this.posts;
    }

    findById(id:number): Post  {
       const singlePost=  this.posts.find(post=> post.id===id)

       if (!singlePost){
        throw new NotFoundException(`Post with ${id}  not found`);
       }

       return singlePost;
    }
    
    create(createdPost: Omit<Post, 'id' | 'createdAt'> ): Post {
        const newPost: Post = {
            id: this.getNextId(),
            ...createdPost,
            createdAt: new Date(),

        }
        this.posts.push(newPost);
        return newPost
    }

    private getNextId(): number {
        return  this.posts.length > 0?
         Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    }

    update(id: number, updatedPost: Partial<Omit<Post , 'id' | 'createdAt'>>): Post {
        const index =this.posts.findIndex(post => post.id === id);
        if (index === -1){
            throw new NotFoundException(`Post with ${id}  not found`);
        }
        this.posts[index] = {
            ...this.posts[index],
            ...updatedPost,
             updatedAt: new Date(),
        }
        return this.posts[index];
    }

    remove(id: number) : {message : string} {
        const index= this.posts.findIndex(post => post.id === id);
        if (index === -1){
            throw new NotFoundException(`Post with ${id}  not found`);
        }
        this.posts.splice(index, 1);

        return { message : `Post ${id} is deleted`}
    }
}
