import { Injectable, OnApplicationShutdown, Logger } from '@nestjs/common';
import { Consumer, Kafka, ConsumerSubscribeTopic, ConsumerRunConfig, AssignerProtocol } from 'kafkajs';
import { kafkaConfig } from 'src/stock/constants/variables.entorno';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly logger = new Logger(ConsumerService.name);

  private readonly kafka = new Kafka({
    requestTimeout: 30000,
    brokers: [process.env.KAFKA_URI]
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

  async describeGroups(groupId: string) {
    const admin = this.kafka.admin();

    try {
      await admin.connect();
      const groupDescription = await admin.describeGroups([groupId]);
      await admin.disconnect();

      if (!groupDescription || groupDescription.groups[0].members.length == 0) {
        return { error: 'No existen topicos asociados a este grupo' };
      }

      const members = groupDescription.groups[0].members.map((member) => {
        const assignmentBuffer = Buffer.from(member.memberAssignment);
        console.log(assignmentBuffer);
        const assignment = AssignerProtocol.MemberAssignment.decode(assignmentBuffer);

        return {
          memberId: member.memberId,
          clientId: member.clientId,
          clientHost: member.clientHost,
          assignment: assignment.assignment,
        };
      });

      this.logger.log(`Se obtuvo información sobre el grupo de consumidores con ID "${groupId}".`);
      return members;
    } catch (error) {
      this.logger.error(`Se produjo un error al obtener información sobre el grupo de consumidores con ID "${groupId}": ${error.message}`, error.stack);
      throw error;
    } finally {
      await admin.disconnect();
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
