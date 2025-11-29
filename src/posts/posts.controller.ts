import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Put, Delete, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
// import type { Post as PostInterface} from './interfaces/post.interface';
import { CreatePost } from './dto/create-post-dto';
import { FilePipe } from './dto/file-exist';
import { UpdatePost } from './dto/update-post-dto';
import { Post as PostEntity } from './entities/post-entity';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsservice: PostsService) {}
    
    @Get()
    async findAll(@Query('search') search: string): Promise<PostEntity[]>{
        return this.postsservice.findAll()
    }

    @Get('post/:id')
    async findById(@Param('id', ParseIntPipe,FilePipe) id: number) : Promise<PostEntity> {
        return this.postsservice.findById(id);
    }
     
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createdPost: CreatePost): Promise<PostEntity> {
        return this.postsservice.create(createdPost);
    }
    
    @Put('post/:id')
    async update(@Param('id', ParseIntPipe, FilePipe) id: number,
    @Body() updatedPost: UpdatePost ): Promise<PostEntity> {
        return this.postsservice.update(id, updatedPost);
    }

    @Delete('post/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe, FilePipe) id: number): Promise<void> {
        await this.postsservice.remove(id);
    }
    }
    
