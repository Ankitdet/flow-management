import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import serverlessExpress from '@vendia/serverless-express'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Handler } from 'aws-lambda'
import { useContainer } from 'class-validator'
import express from 'express'
import { MainModule } from './main.module'

let cachedServer: Handler
const isCachedServerBootStraped = async () => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer()
    }
}

const bootstrapServer = async (): Promise<Handler> => {
    const expressApp = express()
    const app = await NestFactory.create(MainModule, new ExpressAdapter(expressApp), {
        logger: false,
        cors: true,
        bodyParser: true,
    })
    app.use(
        express.urlencoded({
            extended: true,
        }),
    ).use(express.json({ limit: '1mb' }))
    useContainer(app.select(MainModule), { fallbackOnErrors: true })
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: false,
    })
    app.setGlobalPrefix('/api')
    app.enableShutdownHooks()
    express.raw({
        type: '*/*',
    })
    await app.init()
    return serverlessExpress({
        app: expressApp,
    })
}

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context, callback) => {
    await isCachedServerBootStraped()
    event.path = `${event.path}/`
    event.path = event.path.includes('swagger-ui') ? `swagger${event.path}` : event.path

    event.headers = {
        ...event.headers,
        'Access-Control-Allow-Origin': '*',
    }
    return cachedServer(event, context, callback)
}

export const sample = async (_event: any, _context: any, _callback: any) => {
    _callback(null, {
        statusCode: 200,
        body: JSON.stringify(`API Called done !!!`),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    })
}