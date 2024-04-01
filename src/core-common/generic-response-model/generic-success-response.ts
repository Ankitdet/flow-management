import { Result } from '../result-model'

export class GenericSuccessResponse<T> {
    public statusCode: number
    public success: boolean
    public data: T
    public status: number
    public reqId: string

    initilize(result: Result<T>, statusCode: number) {
        this.statusCode = statusCode
        this.data = result.data
        this.success = result.success
    }
}
