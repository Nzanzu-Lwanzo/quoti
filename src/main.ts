import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173']
    }
  });

  // Swagger docs
  const config = new DocumentBuilder()
    .setTitle('Quoti')
    .setDescription("Public Api built with NestJs to share quotes from books we love")
    .setVersion("0.0.1")
    .setContact(
      "Nzanzu Lwanzo",
      "https://github.com/Nzanzu-Lwanzo",
      "nzanzu.lwanzo.work@gmail.com"
    )
    .build()

  const document = SwaggerModule.createDocument(app, config, {

  })

  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
