import { plainToClass } from 'class-transformer'
import { Result } from '../result-model'

export function toResponse<T>(C: new (...P: any) => T, result: Result<any>): Result<T> {
    const response = plainToClass(C, result?.data, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
        strategy: 'exposeAll',
    })
    return Result.success(response)
}
