import { Global, Module } from '@nestjs/common';
import { BaseRepository } from './crud-ops/repo/base-crud.repository';
import { AwsS3Service } from './s3-services/s3-service.provider';

@Global()
@Module({
    imports: [],
    providers: [BaseRepository as any,
    {
        useClass: AwsS3Service,
        provide: AwsS3Service.name
    }
    ],
    exports: [BaseRepository],
})
export class BaseModule { }