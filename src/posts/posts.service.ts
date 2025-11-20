import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

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
}
