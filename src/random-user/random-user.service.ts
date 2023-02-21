import { Injectable } from '@nestjs/common';
import {Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RandomUser, RandomUserDocument } from './schemas/randomUser.schema';


@Injectable()
export class RandomUserService {
    constructor(@InjectModel(RandomUser.name) private readonly randomUserModel: Model<RandomUserDocument>) {}

    async create() {
        try {
            const response = await fetch('https://randomuser.me/api/?results=20');
            const data = await response.json();
            const users = data.results.map(user => ({
                firstName: user.name.first,
                lastName: user.name.last,
                username: user.login.us,
                profilePic1: user.picture.large
                
            }));
            await this.randomUserModel.create(users);
            } catch (error) {
            console.error(error);
            return [];
        }
        
    }

    async findAll(): Promise<RandomUserDocument[]> {
        return await this.randomUserModel.find().exec();
    }

}
