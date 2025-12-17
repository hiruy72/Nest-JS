import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/posts/dto/regiser-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body()registerDto: RegisterDto){
        return this.authService.regigisteruser(registerDto);
    }
}
