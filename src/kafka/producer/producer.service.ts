import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown{

    async onModuleInit() {
        await this.producer.connect();
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }

    private readonly kafka = new Kafka({
        requestTimeout:30000,
        brokers:[process.env.KAFKA_URI]
    });

    private readonly producer:Producer = this.kafka.producer();

    async produce (record:ProducerRecord){
        await this.producer.send(record);
    }

    

}
