import { Controller, Get, Param, ParseIntPipe, Query, Search } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsservice: PostsService) {}
    
    @Get()
    findAll(@Query('search') search: string): Post[]{
        const extractedPosts = this.postsservice.findAll();
        if (search){
            return extractedPosts.filter(post => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return extractedPosts;
    }

    @Get('post/:id')
    findById(@Param('id', ParseIntPipe) id: number) : Post | undefined {
        return this.postsservice.findById(id);
    }
    }
    
