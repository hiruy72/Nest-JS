import { refresh } from 'next/cache';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/posts/dto/regiser-dto';
import { LoginDto } from 'src/posts/dto/login-dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { CurrentUser } from './decorators/current-user-decoraror';
import { Roles } from './decorators/roles.decoraters';
import { RolesGuard } from './guards/roles-guard';
import { UserRole } from './entities/user-entity';
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
    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken: string){
        return this.authService.refreshToken(refreshToken);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrentUser() user: any){
        return user;
    }
    @Post('create-admin')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    createAdmin(@Body() registerDto: RegisterDto){
        return this.authService.regigisteruser(registerDto);
    }

}
