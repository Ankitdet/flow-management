import { INestApplication } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

export const createNestApp = async <
  T extends INestApplication = INestApplication,
>(
  httpAdapter?: AbstractHttpAdapter,
): Promise<T> => {
  const app = await NestFactory.create<T>(MainModule, httpAdapter);
  app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX);

  return app;
};

async function bootstrap() {
  const app = await createNestApp();
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  });

  await app.listen(3000);
}

bootstrap();