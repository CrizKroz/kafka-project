// Configuración de MongoDB
export const mongoConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
  
  // Configuración de Kafka
  export const kafkaConfig = {
    clientId: 'my-app',
    brokers: [process.env.KAFKA_URI || 'localhost:9092'],
  };
  