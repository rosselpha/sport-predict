import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDetails } from './user.interface';

import { UserDocument } from './schemas/user.schema';

@Injectable()
export class userService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}


    _getUserDetails(user: UserDocument): UserDetails {
        return {
            id: user._id,
            email: user.email,
            userName: user.userName,
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = await this.userModel.findById(id).exec();
        if(!user) return null;
        return this._getUserDetails(user);
    }

    async create( userName: string, email: string, hashedPassword: string ): Promise<UserDocument> {

        const newUser = new this.userModel({  userName, email, password: hashedPassword});
        return newUser.save()
    }

}
