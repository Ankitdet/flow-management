import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectId } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Result } from '../../../core-common/result-model';

export interface IRepository<T extends BaseEntity> {
    findAll(options?: FindManyOptions<T>): Promise<Result<T>> | Promise<Result<{ result: T[], count: number }>>;
    findById(options: FindOneOptions<T>): Promise<Result<T>>;
    saveAll(data: DeepPartial<T>[]): Promise<Result<T[] | T>>;
    update(criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<Result<boolean>>
    delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>): Promise<Result<boolean>>
}