import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { SportPicksModule } from './sport_picks/sport_picks.module';
import { AuthModule } from './auth/auth.module';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
import { StripeModule } from './stripe/stripe.module';
import { RandomUserModule } from './random-user/random-user.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
       }),
    }),
    UserModule,
    SportPicksModule,
    AuthModule,
    StripeModule,
    RandomUserModule,
  ],
  controllers: [AppController, StripeController, ],
  providers: [AppService, StripeService, ],
})
export class AppModule {}
