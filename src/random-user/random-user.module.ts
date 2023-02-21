import { Module } from '@nestjs/common';
import { RandomUserController } from './random-user.controller';
import { RandomUserService } from './random-user.service';

import { MongooseModule } from '@nestjs/mongoose';

import { RandomUser, RandomUserSchema } from './schemas/randomUser.schema';

@Module({
  imports: [    
    MongooseModule.forFeature([{ name: RandomUser.name, schema: RandomUserSchema }]),
  ],
  controllers: [RandomUserController],
  providers: [RandomUserService]
})
export class RandomUserModule {}
