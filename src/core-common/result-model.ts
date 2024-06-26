import { CommonError } from "./common-error"

export class Result<T> {
    success: boolean = false
    data: T = null
    error: CommonError = null

    public static success<T>(value: T): Result<T> {
        const result = new Result<T>()
        result.success = true
        result.data = value
        return result
    }

    public static failed<T>(error: CommonError): Result<T> {
        const result = new Result<T>()
        result.success = false
        result.error = error
        return result
    }

    public static throwIfFailed<T>(result: Result<any>): Result<T> {
        if (result.success) {
            return
        }
        throw Result.failed(result.error)
    }
}
