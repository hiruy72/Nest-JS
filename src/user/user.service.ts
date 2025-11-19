import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
    constructor(private readonly helloservice: HelloService) {}
    getAllUsers() {
        return [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
            { id: 3, name: 'Alice Johnson' },
        ];
    }
    getUserbyId(id: number){
        const user =this.getAllUsers().find(user=> user.id=== id);
        return user;
    }
    getWelcome(userId: number): string {
        const user = this.getUserbyId(userId);
        if (!user) {
            return "User not found"
        }
        return this.helloservice.getUsername(user?.name)
    }
}
