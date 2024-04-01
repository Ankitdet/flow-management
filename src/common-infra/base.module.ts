import { Global, Module } from '@nestjs/common';
import { BaseRepository } from './crud-ops/repo/base-crud.repository';

@Global()
@Module({
    imports: [],
    providers: [BaseRepository as any],
    exports: [BaseRepository],
})
export class CrudModule { }