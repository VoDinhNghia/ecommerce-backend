import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ecommerce Management')
    .setDescription('The ecommerce management API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  app.enableCors({
    origin: [frontendUrl],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
