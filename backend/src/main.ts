/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors({
    origin: 'http://localhost:3001', // Schimbați portul în funcție de cel pe care rulează frontend-ul
  }));
  await app.listen(3000);
}
bootstrap();
