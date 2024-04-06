import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { MainModule } from './main.module';
import { Context } from 'aws-lambda';

let cachedServer: any;

export const handler = async (event: Event, context: Context, _callback: any) => {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(MainModule);
        await nestApp.init();
        cachedServer = serverlessExpress({ app: nestApp.getHttpAdapter().getInstance() });
    }
    return cachedServer(event, context);
}