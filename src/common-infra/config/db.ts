import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { Product } from '../../routes/product/entity/product.entity';
import { User } from '../../routes/user/entity/user.entity';
import { DBConfig } from './db-config';

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