import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      origin: ['http://localhost:3000', 'http://localhost:5000']
    }
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
