import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import path from 'path';
import { TypeOrmConfigService } from './common-infra/config/database';
import { AllModules } from './export-module';
import { BaseModule } from './common-infra/base.module';

@Global()
@Module({
  imports: [
    ...AllModules,
    ConfigModule.load(path.resolve(__dirname, '**', '*.entity.{ts,js}')),
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigModule],
        useClass: TypeOrmConfigService,
      })
  ],
  controllers: [],
  providers: [],
  exports: [
    BaseModule
  ]
})
export class MainModule { }
