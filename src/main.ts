import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {Logger, LogLevel} from '@nestjs/common';
import * as chalk from 'chalk';
async function bootstrap() {
  process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1"
  const logger = new Logger('Starting');
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn','debug'] });
  const configService = app.get(ConfigService);
  const PORTSTRING = configService.get<string>('PORT');
  const PORT = parseInt(PORTSTRING);
  logger.debug(`Starting application on port ${PORT}...`);
  const config = new DocumentBuilder()
    .setTitle('Kafka Services')
    .setDescription('Apis para probar productores y consumidores de Kafka')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //localhost:3000/api || {host}/api
  await app.listen(PORT);
}
bootstrap();
