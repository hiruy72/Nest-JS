import { RegisterDto } from './../posts/dto/regiser-dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/posts/dto/login-dto';
import { access } from 'fs';
import { refresh } from 'next/cache';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService : JwtService
    ) {}
 
    async regigisteruser(registerDto: RegisterDto){
        const exist = await this.userRepository.findOne({
            where: {email: registerDto.email}
        })
        if(exist){
            throw new ConflictException('Email in use')
        }
        const hashPassword = await bcrypt.hash(registerDto.password, 10);

        const newuser = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashPassword,
            role: UserRole.USER
        })

        const savedUser =await this.userRepository.save(newuser);

        const {password, ...result} = savedUser;

        return {
            user: result,
            message: "User registered successfully"
        }
    }

    async createAdmin(registerDto: RegisterDto){

        const exist = await this.userRepository.findOne({
            where : {email: registerDto.email}
        })

        if(exist){
            throw new ConflictException('Email in use')
        }

        const hashPassword = await bcrypt.hash(registerDto.password, 10);
        const newadmin = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashPassword,
            role: UserRole.ADMIN
        })
        const savedAdmin = await this.userRepository.save(newadmin);
        const {password, ...result} = savedAdmin;
        return {
            user: result,
            message: "Admin registered successfully"
        }
    }

    async refreshToken(refreshToken: string){
        try {
            const payload = await this.jwtService.verify(refreshToken,{
                secret: 'refresh_secret'
            })
            const user = await this.userRepository.findOne({
                where: {id : payload.sub}
            })

            if (!user){
                throw new UnauthorizedException('Invalid Token')
            }

            const accessToken = this.generateAccessToken(user)

            return { accessToken }
        } catch (error) {
            throw new UnauthorizedException('Invalid Token')
        }
    }

    async LoginUser(loginDto: LoginDto){
        const user = await this.userRepository.findOne({
            where: {email: loginDto.email}
        })

        if(!user || !(await bcrypt.compare(loginDto.password, user.password))){
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateToken(user);
        const {password, ...result} = user;
        return {
            user: result,
            ...token
        }

      
    }
    private generateToken(user: User){
            return{
                accessToken: this.generateAccessToken(user),
                refreshToken: this.generateRefreshToken(user),
            }
    }
    private generateAccessToken(user: User): string {
          const payload = {
            email :  user.email,
            sub : user.id,
            role: user.role

          }
          return this.jwtService.sign(payload, {
            secret : 'jwt_secret',
            expiresIn: '15m',
          })


    }
    private generateRefreshToken(user: User): string {
          const payload = {
             sub : user.id,

          }
          return this.jwtService.sign(payload, {
            secret : 'refresh_secret',
            expiresIn: '7d',
          })


    }


    
}
