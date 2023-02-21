import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './user.interface';
import { userService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: userService) {}
    @Get(':id')
    getUser(@Param('id') id: string): Promise<UserDetails | null> {
        return this.userService.findById(id);
    }

    //get user by email
    @Get('email/:email')
    getUserByEmail(@Param('email') email: string): Promise<UserDetails | null> {
        return this.userService.findByEmail(email);
    }

} 
