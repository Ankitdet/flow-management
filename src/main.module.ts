import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { BaseModule } from './common-infra/base.module';
import { TypeOrmConfigService } from './common-infra/config/database';
import { AllModules } from './export-module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './middleware/filters/global-exception-handler';

@Global()
@Module({
  imports: [
    ...AllModules,
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigModule],
        useClass: TypeOrmConfigService,
      })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [
    BaseModule
  ]
})
export class MainModule { }
