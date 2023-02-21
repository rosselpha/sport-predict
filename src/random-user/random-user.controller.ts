import { Controller, Get,Post } from '@nestjs/common';

import { RandomUserService } from './random-user.service';

@Controller('random-user')
export class RandomUserController {
    constructor(private randomUserService:RandomUserService) {}
    
    @Post()
    getRanUser() {
        return this.randomUserService.create();
    }
    @Get()
    findAllRanUser() {
        return this.randomUserService.findAll();
    }
}
