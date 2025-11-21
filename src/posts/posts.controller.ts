import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface} from './interfaces/post.interface';
import { parse } from 'path';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsservice: PostsService) {}
    
    @Get()
    findAll(@Query('search') search: string): PostInterface[]{
        const extractedPosts = this.postsservice.findAll();
        if (search){
            return extractedPosts.filter(post => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        }
        return extractedPosts;
    }

    @Get('post/:id')
    findById(@Param('id', ParseIntPipe) id: number) : PostInterface | undefined {
        return this.postsservice.findById(id);
    }
     
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createdPost: Omit <PostInterface, 'id' | 'createdAt'>): PostInterface {
        return this.postsservice.create(createdPost);
    }

    @Put('post/:id')
    update(@Param('id', ParseIntPipe) id: number,
    @Body() updatedPost: Partial<Omit<PostInterface, 'id' | 'createdAt'>>): PostInterface {
        return this.postsservice.update(id, updatedPost);
    }

    @Delete('post/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): void {
        this.postsservice.remove(id);
    }
    }
    
