import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PickDocument = HydratedDocument<Pick>;

@Schema()
export class Pick {
  @Prop()
  game: string;

  @Prop()
  pick: string;

  @Prop()
  confidence: number;
}
export const PickSchema = SchemaFactory.createForClass(Pick);
