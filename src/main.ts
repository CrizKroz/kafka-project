import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {Logger} from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('PORT');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORTSTRING = configService.get<string>('PORT');
  const PORT = parseInt(PORTSTRING);
  const config = new DocumentBuilder()
    .setTitle('Kafka Services')
    .setDescription('Apis para probar productores y consumidores de Kafka')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //localhost:3000/api || {host}/api
  logger.log(`Aplicacion escuchando en el puerto ${PORT}`)
  await app.listen(PORT);
}
bootstrap();
