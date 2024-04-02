import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { Product } from '../../routes/product/entity/product.entity';
import { User } from '../../routes/user/entity/user.entity';

export const DBConfig = {
    "POSTGRES_URL": "postgres://default:o3PGFCb6JsES@ep-sweet-pine-a4kfdpur-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    "POSTGRES_PRISMA_URL": "postgres://default:o3PGFCb6JsES@ep-sweet-pine-a4kfdpur-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
    "POSTGRES_URL_NO_SSL": "postgres://default:o3PGFCb6JsES@ep-sweet-pine-a4kfdpur-pooler.us-east-1.aws.neon.tech:5432/verceldb",
    "POSTGRES_URL_NON_POOLING": "postgres://default:o3PGFCb6JsES@ep-sweet-pine-a4kfdpur.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    "POSTGRES_USER": "default",
    "POSTGRES_HOST": "ep-sweet-pine-a4kfdpur-pooler.us-east-1.aws.neon.tech",
    "POSTGRES_PASSWORD": "o3PGFCb6JsES",
    "POSTGRES_DATABASE": "verceldb"
}

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const connectionManager: ConnectionManager = getConnectionManager();
        let options: any;

        if (connectionManager.has('default')) {
            options = connectionManager.get('default').options;
            await connectionManager.get('default').close();
        } else {
            options = {
                type: 'postgres',
                host: DBConfig.POSTGRES_HOST,
                username: DBConfig.POSTGRES_USER,
                password: DBConfig.POSTGRES_PASSWORD,
                database: DBConfig.POSTGRES_DATABASE,
                url: DBConfig.POSTGRES_URL,
                entities: [Product, User],
                ssl: true,
                synchronize: true,
            } as TypeOrmModuleOptions;
        }
        return options;
    }
}