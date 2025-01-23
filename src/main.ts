import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:8100', // Permitir solicitudes desde esta URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o credenciales
  });

  await app.listen(3000);
  console.log(`Servidor ejecutándose en http://localhost:3000`);
}
bootstrap();
