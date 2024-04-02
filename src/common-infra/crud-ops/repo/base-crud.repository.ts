import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectId, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { IRepository } from '../interface/base-crud.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CommonError } from '../../../core-common/common-error';
import { Result } from '../../../core-common/result-model';

export abstract class BaseRepository<T extends BaseEntity> implements IRepository<T>{
    constructor(public readonly repository: Repository<T>) { }

    public async findAll(options?: FindManyOptions<T>): Promise<Result<T[]>> {
        try {
            const findAll = await this.repository.find(options);
            return Result.success(findAll)
        } catch (error) {
            return Result.throwIfFailed(Result.failed(new CommonError('Failed to FindAll', { options })))
        }
    }

    public async findById(options: FindOneOptions<T>): Promise<Result<T>> {
        try {
            const findByIdResult = await this.repository.findOne(options);
            return Result.success(findByIdResult)
        } catch (error) {
            return Result.throwIfFailed(Result.failed(new CommonError('Failed to FindById', { options })))
        }
    }
    public async saveAll(data: DeepPartial<T>[]): Promise<Result<T | T[]>> {
        try {
            const entity = this.repository.create(data);
            const saveResult = await this.repository.save(entity);
            if (saveResult) {
                if (saveResult.length == 1) {
                    return Result.success(saveResult[0])
                }
                return Result.success(saveResult)
            }
            throw new Error(`Failed to create data.`)
        } catch (error) {
            return Result.throwIfFailed(Result.failed(new CommonError('Failed to create', data)))
        }
    }

    public async update(criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>, partialEntity: QueryDeepPartialEntity<T>): Promise<Result<boolean>> {
        try {
            const updateResult = await this.repository.update(criteria, partialEntity);
            if (updateResult) {
                return Result.success(true)
            }
            throw new Error(`Failed to update data.`)
        } catch (error) {
            return Result.throwIfFailed(Result.failed(new CommonError('Failed to update', { criteria, partialEntity })))
        }
    }

    public async delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>): Promise<Result<boolean>> {
        try {
            const deleteResult = await this.repository.delete(criteria);
            if (deleteResult) {
                return Result.success(true)
            }
            throw new Error(`Failed to delete data.`)
        } catch (error) {
            return Result.throwIfFailed(Result.failed(new CommonError('Failed to delete', { criteria })))
        }
    }
}