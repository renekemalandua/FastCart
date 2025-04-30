import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import seed from './prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });
  await seed();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
