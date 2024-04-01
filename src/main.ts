import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
import "reflect-metadata";
import { MainModule } from './main.module';
import { GlobalExceptionFilter } from "./middleware/filters/global-exception-handler";
import { ResponseHandlerInterceptor } from "./middleware/interceptor/response-handler";

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    bodyParser: true,
    cors: true,
  })

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
  app.useGlobalInterceptors(new ResponseHandlerInterceptor())

  app.setGlobalPrefix('/api')

  app.useGlobalFilters(new GlobalExceptionFilter())

  app.enableShutdownHooks()

  await app.listen(3000);

  return app
}

process.on('uncaughtException', err => {
  console.error(err, 'LOGGER', false)
})
// Test
process.on('unhandledRejection', err => {
  console.error(err, 'LOGGER', false)
})

bootstrap()
  .then(async app => {
    console.log(`App is running on ${await app.getUrl()}`)
  })
  .catch(err => {
    console.error(`error while 3blocks.io running...`, err)
    throw err
  })

