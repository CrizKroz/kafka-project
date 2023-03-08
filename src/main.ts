import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as yaml from 'yaml';

const yamlConfig = yaml.parse(fs.readFileSync('configmap-microservice-documenters.yml', 'utf8'));
const configJson = JSON.parse(yamlConfig['data']['config.json']);
// Carga las variables de entorno del archivo de configuración YML
process.env.MONGODB_URI = configJson.enviroments.MONGODB_URI;
process.env.KAFKA_URI = configJson.enviroments.KAFKA_URI;
process.env.PORT = configJson.enviroments.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Kafka Services')
    .setDescription('Apis para probar productores y consumidores de Kafka')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //localhost:3000/api || {host}/api
  
  await app.listen(process.env.PORT);
}
bootstrap();
