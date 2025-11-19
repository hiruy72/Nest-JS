import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {

    getHello(): string {
        return 'Hello, World!';
    }

    getUsername(name: string): string {
        return `Hello , ${name}!`;
    }
}
