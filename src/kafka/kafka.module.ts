import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsumerService } from './consumer/consumer.service';
import { ProducerService } from './producer/producer.service';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [ConsumerService, ProducerService],
  exports:[ConsumerService, ProducerService]
})
export class KafkaModule {}
