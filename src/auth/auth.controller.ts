import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //get login user using verify jwt
    

    
    @Post('register')
    register(@Body()user: NewUserDTO): Promise< UserDetails | any> {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body()user: NewUserDTO): Promise<{token: string} | null> {
        return this.authService.login(user);
    }

    @Post('verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body()payload:{jwt:string} ){
        return this.authService.verifyJwt(payload.jwt);
    }
    @Post('save-email')
    @HttpCode(HttpStatus.OK)
    saveEmail(@Body()payload:{email:string} ){
        return this.authService.saveEmail(payload.email);
    }
}
