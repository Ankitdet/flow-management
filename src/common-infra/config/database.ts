import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { Product } from '../../routes/product/entity/product.entity';

export const DBConfig = {
    "POSTGRES_USER": "admin",
    "POSTGRES_HOST": "mydbinstance.ch4ouy6qusj4.us-east-1.rds.amazonaws.com",
    "POSTGRES_PASSWORD": "root12345",
    "PORT": 3306
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
                type: 'mysql',
                host: DBConfig.POSTGRES_HOST,
                username: DBConfig.POSTGRES_USER,
                password: DBConfig.POSTGRES_PASSWORD,
                database: 'velloza',
                port: DBConfig.PORT,
                entities: [Product],
                ssl: {
                    rejectUnauthorized: false,
                },
                synchronize: true,
            } as TypeOrmModuleOptions;
        }
        return options;
    }
}