import { Injectable, HttpStatus, HttpException } from '@nestjs/common'; 

import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { userService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { UserDetails } from 'src/user/user.interface';


@Injectable()
export class AuthService {
    constructor(private userService: userService, private jwtService:JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user: NewUserDTO): Promise<UserDetails | any > {

        const { userName, email, password } = user;
        const existingUser = await this.userService.findByEmail(email);

        if(existingUser) return "already exists";

        const hashedPassword = await this.hashPassword(password);
        const newUser =  this.userService.create(userName, email, hashedPassword);
        return this.userService._getUserDetails(await newUser);
    }

    async verifyEmail(email: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        return !!user;
    }
    async saveEmail(email: string): Promise<any> {
        const newUser = this.userService.create("", email, "");
        return this.userService._getUserDetails(await newUser);
    } 

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser( email:string, password:string): Promise<UserDetails | null> {

        const user = await this.userService.findByEmail(email);
        const doesUserExist = !!user;

        if(!doesUserExist) return null;

        const doesPasswordMatch = await this.doesPasswordMatch(password, user.password);

        if(!doesPasswordMatch) return null;
        return this.userService._getUserDetails(user);
    }

    async login(existingUser: ExistingUserDTO): Promise<{token :string} | null> {
        const {email , password} = existingUser;
        const user = await this.validateUser(email, password);

        if(!user)
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        
        const jwt = await this.jwtService.signAsync({user})
        return {token: jwt, user:user} as any;
    }

    async verifyJwt(jwt:string ):Promise<{exp: number }> {
        try{
            const { exp } = await this.jwtService.verifyAsync(jwt);
            return { exp };
        }catch(error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

}
