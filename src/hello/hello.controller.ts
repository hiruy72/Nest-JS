import { Controller, Get, Param } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloservice : HelloService) {}
    @Get('')
    getHello(): string {
        return this.helloservice.getHello();
    }

    @Get(':name') 

    getUsername(@Param('name') name: string): string {
        return this.helloservice.getUsername(name)
    }

}
