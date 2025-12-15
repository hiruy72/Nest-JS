import { RegisterDto } from './../posts/dto/regiser-dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
}
