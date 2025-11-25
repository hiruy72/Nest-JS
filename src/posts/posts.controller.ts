import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Put, Delete, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface} from './interfaces/post.interface';
import { parse } from 'path';
import { HiruyPipe } from 'src/hiruy/hiruy.pipe';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsservice: PostsService) {}
    
    @Get()
    findAll(@Query('search') search: string): PostInterface[]{
        const extractedPost = this.postsservice.findAll()

        if(search){
            return extractedPost.filter(post=> post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        }

        return extractedPost;


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
    
    @UsePipes(HiruyPipe)
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
    
