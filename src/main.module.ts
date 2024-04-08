import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmConfigService } from './common-infra/config/database';
import { AwsS3Service } from './common-infra/s3-services/s3-service.provider';
import { AllModules, GlobleModules } from './export-module';
import { GlobalExceptionFilter } from './middleware/filters/global-exception-handler';
import { ResponseHandlerInterceptor } from './middleware/interceptor/response-handler';

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
      provide: APP_INTERCEPTOR,
      useClass: ResponseHandlerInterceptor
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
