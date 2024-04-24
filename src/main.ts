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
  await app.listen(4000);
  return app;
}

bootstrap();

process.on('uncaughtException', (err) => {
  console.warn(err, 'LOGGER', false);
});

bootstrap()
  .then(async (app) => {
    console.log(`App is running on ${await app.getUrl()}`);
  })
  .catch((err) => {
    console.error(`error while 3blocks.io running...`, err);
    throw err;
  });
