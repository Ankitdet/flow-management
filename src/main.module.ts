import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmConfigService } from './common-infra/config/database';
import { AwsS3Service } from './common-infra/s3-services/s3-service.provider';
import { AllModules, GlobleModules } from './export-module';
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
    {
      provide: AwsS3Service.name,
      useClass: AwsS3Service
    },
  ],
  exports: [
    ...GlobleModules,
    {
      provide: AwsS3Service.name,
      useClass: AwsS3Service
    },
  ]
})
export class MainModule { }
