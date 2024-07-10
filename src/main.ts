import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({whitelist: false, forbidNonWhitelisted: true}))
  
  await app.listen(process.env.DB_PORT, () => {
    console.log('Server Nest On: ', process.env.DB_PORT);
  });
}
bootstrap();
