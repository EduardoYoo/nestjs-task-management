import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //Create new NestJS app
  app.useGlobalPipes(new ValidationPipe()); //If NestJS encounters any validation decorators
  await app.listen(3000);
}
bootstrap();
