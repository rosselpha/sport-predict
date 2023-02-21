import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RandomUserDocument = HydratedDocument<RandomUser>;

@Schema()
export class RandomUser {
    @Prop()
    firstName: string;
    
    @Prop()
    lastName: string;
    
    @Prop()
    username: string;
    
    @Prop()
    profilePic1: string;

}
export const RandomUserSchema = SchemaFactory.createForClass(RandomUser);
