import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, ConsumerSubscribeTopic,  ConsumerRunConfig } from 'kafkajs';
import { kafkaConfig, mongoConfig } from 'src/stock/constants/variables.entorno';

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    
    async onApplicationShutdown() {
        
        for(const consumer of this.consumers){
            await consumer.disconnect();
        }
    }


    private readonly kafka = new Kafka({
        requestTimeout:30000,
        brokers:[kafkaConfig.brokers[0]]
    });

    private readonly consumers:Consumer[] = [];

    async consume (groupId:string, topic:ConsumerSubscribeTopic, config:ConsumerRunConfig){
        const consumer:Consumer = this.kafka.consumer({groupId:groupId});
        consumer.connect().catch(e =>console.error(e));
        consumer.subscribe(topic);
        consumer.run(config);
        this.consumers.push(consumer);
    }
}
