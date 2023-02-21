import { Module } from '@nestjs/common';
import { SportPicksService } from './sport_picks.service';
import { SportPicksController } from './sport_picks.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Pick, PickSchema } from './schemas/picks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pick.name, schema: PickSchema }]),
  ],
  providers: [SportPicksService],
  controllers: [SportPicksController],
})
export class SportPicksModule {}
