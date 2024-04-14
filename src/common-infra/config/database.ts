import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';

export const DBConfig = {
    "POSTGRES_USER": "u185871994_my_db",
    "POSTGRES_HOST": "193.203.184.52",
    "POSTGRES_PASSWORD": "Ankit#2car",
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
                autoLoadEntities: true,
                database: 'u185871994_my_db',
                port: DBConfig.PORT,
                entities: ['**/*.entity{.ts|.js}'],
                ssl: {
                    rejectUnauthorized: false,
                },
                synchronize: true,
            } as TypeOrmModuleOptions;
        }
        return options;
    }
}