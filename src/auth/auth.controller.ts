import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/posts/dto/regiser-dto';
import { LoginDto } from 'src/posts/dto/login-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body()registerDto: RegisterDto){
        return this.authService.regigisteruser(registerDto);
    }
    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.LoginUser(loginDto);

    }
}
