import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';
import express from 'express';
import { useContainer } from 'class-validator';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    bodyParser: true,
    cors: true,
  });
  express.raw({
    type: '*/*',
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.setGlobalPrefix('/api');
  useContainer(app.select(MainModule), { fallbackOnErrors: true });
  app.enableShutdownHooks();
  await app.listen(3002);
  return app;
}

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
