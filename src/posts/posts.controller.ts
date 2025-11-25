import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Put, Delete, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface} from './interfaces/post.interface';
import { CreatePost } from './dto/create-post-dto';
import { FilePipe } from './dto/file-exist';
import { UpdatePost } from './dto/update-post-dto';


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
    findById(@Param('id', ParseIntPipe,FilePipe) id: number) : PostInterface | undefined {
        return this.postsservice.findById(id);
    }
     
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createdPost: CreatePost): PostInterface {
        return this.postsservice.create(createdPost);
    }
    
    @Put('post/:id')
    update(@Param('id', ParseIntPipe, FilePipe) id: number,
    @Body() updatedPost: UpdatePost ): PostInterface {
        return this.postsservice.update(id, updatedPost);
    }

    @Delete('post/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe, FilePipe) id: number): void {
        this.postsservice.remove(id);
    }
    }
    
