import { Controller , Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @Get()
    getAllUsers() {
        return this.userservice.getAllUsers();
    }
    @Get('uuid/:id')
     getUserbyId(@Param('id', ParseIntPipe) id: number){
        return this.userservice.getUserbyId(id);
     }
    @Get(':id/welcome')
    getWelcome(@Param('id',ParseIntPipe) id : number):string{
       return this.userservice.getWelcome(id);
    }
   
}
