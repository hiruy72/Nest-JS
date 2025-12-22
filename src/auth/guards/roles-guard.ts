import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../entities/user-entity";
import { ROLES_KEY } from "../decorators/roles.decoraters";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {} // help us access the metadata

    //like ->  next method in the middleware
    canActivate(context: ExecutionContext): boolean{
        const requireRole = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY, [
                context.getHandler(), // method level metadata
                context.getClass(), // class level metadata
            ]
        )
        if(!requireRole){
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        if(!user){
            throw new ForbiddenException('not authenticated')
        }

        const hasRequiredRole = requireRole.some(role=> user.role===role)

        if(!hasRequiredRole){
            throw new ForbiddenException('not allowed')
        }

        return true

        
    }

} 