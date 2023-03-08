import { Module } from '@nestjs/common';
import { KafkaModule } from './kafka/kafka.module';
import { StockModule } from './stock/stock.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
      expandVariables: true,
    }),
    KafkaModule, StockModule],
  controllers: [],
  providers: [],
})
export class AppModule {}