import 'dotenv/config';
import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './data-source';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Desafio teddy  backend')
    .setDescription('API desenvolvida para encurtar links')
    .setVersion('1.0')
    .addTag('teddy')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setGlobalPrefix('');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors();
  await app.listen(process.env.PORT ?? 3001);
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
}
bootstrap();
