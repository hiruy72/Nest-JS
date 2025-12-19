import { jwtStrategy } from './jwt-strategies';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authSerrvice: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jwt_secret',


        })
    }
    async validate(payload: any){
        try {
            const user = this.authSerrvice.getUserById(payload.sub);
            
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
            
        }
    }
}