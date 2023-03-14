import { Injectable, OnApplicationShutdown, Logger, OnModuleInit, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, ConsumerSubscribeTopic, ConsumerRunConfig, AssignerProtocol, logLevel } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown, OnModuleInit{
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(ConsumerService.name);
  private readonly KAFKA_URI = this.configService.get('KAFKA_URI');
  private readonly consumerRegistry: { [groupId: string]: { [topic: string]: boolean } } = {};
  
  async onModuleInit() {
      this.logger.debug(`Kafka URL: ${this.KAFKA_URI}`)
  }
  private readonly kafka = new Kafka({
    requestTimeout: 30000,
    brokers: [this.KAFKA_URI],
    logLevel:logLevel.ERROR
  });

  private readonly consumers: Consumer[] = [];

  async consume(groupId: string, topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {

    if (this.consumerRegistry[groupId] && this.consumerRegistry[groupId][topic.topic.toString()]) {
      this.logger.error(`Ya existe un consumidor con el groupId "${groupId}" y el topic "${topic.topic}".`)
      throw new BadRequestException({error:`Ya existe un consumidor con el groupId "${groupId}" y el topic "${topic.topic}".`});
    }
    const consumer: Consumer = this.kafka.consumer({ groupId: groupId});

    try {
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run(config);
      this.consumerRegistry[groupId] = this.consumerRegistry[groupId] || {};
      this.consumerRegistry[groupId][topic.topic.toString()] = true
      this.consumers.push(consumer);
      this.logger.debug(`El consumidor con ID de grupo "${groupId}" ha comenzado a consumir el topic "${topic.topic.toString()}".`);
      return {
        status:200,
        active:this.consumerRegistry,
      };
    } catch (error) {
      this.logger.error(`Se produjo un error al iniciar el consumidor con ID de grupo "${groupId}": ${error.message}`, error.stack);
      throw error;
    }
  }
  
  async getconsumerRegistry(){
    return this.consumerRegistry;
  }


  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      try {
        await consumer.disconnect();
        this.logger.debug(`El consumidor se desconectó.`);
      } catch (error) {
        this.logger.error(`Se produjo un error al desconectar el consumidor`);
      }
    }
  }
}
