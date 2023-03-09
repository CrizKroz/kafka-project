import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


class data {
  @Prop({ type: String })
  C_ID_MATERIAL: string;
  @Prop({ type: String })
  C_MATERIAL: string;
  @Prop({ type: MongooseSchema.Types.Mixed })
  data_Inventario: any;
}

@Schema({
  collection: 'infoStock_MX',
  versionKey: 'version',
})
export class StockDocument extends Document {
  @Prop({ required: true, unique: false })
  _id: string;
  @Prop({ type: data })
  data: data;
  
  @Prop({ type: Number, default: () => Date.now() })
  timestamp: number;
}

export const StockSchema = SchemaFactory.createForClass(StockDocument);
