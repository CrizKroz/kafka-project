import { Injectable, OnApplicationShutdown, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, ConsumerSubscribeTopic, ConsumerRunConfig, AssignerProtocol } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(ConsumerService.name);
  private readonly KAFKA_URI = this.configService.get('KAFKA_URI');
  
  private readonly kafka = new Kafka({
    requestTimeout: 30000,
    brokers: [this.KAFKA_URI]
  });

  private readonly consumers: Consumer[] = [];

  async consume(groupId: string, topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
    const consumer: Consumer = this.kafka.consumer({ groupId: groupId });

    try {
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run(config);
      this.consumers.push(consumer);

      this.logger.log(`El consumidor con ID de grupo "${groupId}" ha comenzado a consumir el topic "${topic.topic}".`);
    } catch (error) {
      this.logger.error(`Se produjo un error al iniciar el consumidor con ID de grupo "${groupId}": ${error.message}`, error.stack);
      throw error;
    }
  }



  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      try {
        await consumer.disconnect();
        this.logger.log(`El consumidor se desconectó.`);
      } catch (error) {
        this.logger.error(`Se produjo un error al desconectar el consumidor`);
      }
    }
  }
}
