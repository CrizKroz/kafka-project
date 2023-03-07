import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Carga las variables de entorno del archivo de configuración JSON
process.env.MONGODB_URI = config.variablesEntorno.MONGODB_URI;
process.env.KAFKA_URI = config.variablesEntorno.KAFKA_URI;
process.env.PORT = config.variablesEntorno.PORT;
console.log(process.env.MONGODB_URI, process.env.KAFKA_URI, process.env.PORT);
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
