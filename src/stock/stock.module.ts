import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StockDocument, StockSchema } from 'libs/helpers/src';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockConsumer } from './stock.consumer';
import { ConsumerService } from '../kafka/consumer/consumer.service';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: process.env.MONGODB_URI,
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: StockDocument.name, schema: StockSchema }])],
  controllers: [StockController],
  providers: [StockService,ProducerService, StockConsumer, ConsumerService]
})
export class StockModule {}
